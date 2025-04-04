import { FC, useCallback, useEffect, useRef, useState } from "react";
export const forecastApi = "https://api.open-meteo.com/v1/forecast";

type ForecastType = {
  forecast: LocationDataType;
};

const Forecast: FC<ForecastType> = ({ forecast }) => {
  const [data, setData] = useState<ForecastDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  const fetchData = useCallback(() => {
    const { latitude, longitude } = forecast;
    if (latitude && longitude) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await fetch(
            `${forecastApi}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
          );
          const res = await resp.json();
          setData(res);
        } catch (e: unknown) {
          setData(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [forecast]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-base flex">Forecast</span>
      {isLoading ? (
        <span>Loading forecast ...</span>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.daily?.temperature_2m_max?.map((temp: number, key: number) => {
            return (
              <div
                key={`${temp}-${key}`}
                className="flex gap-4 bg-yellow-300 border border-gray-600 text-black font-normal px-4 py-2 rounded-md"
              >
                <span className="font-semibold">Day: {data?.daily?.time?.[key]}</span>
                <div className="flex flex-col bg-pink-500 px-4 py-2 rounded-md text-white gap-0.5">
                  <span>Temperature Max: {temp} °C</span>
                  <span>Temperature Min: {data?.daily?.temperature_2m_min?.[key]} °C</span>
									<span>Precipitation: {data?.daily?.precipitation_sum?.[key]} °C</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Forecast;
