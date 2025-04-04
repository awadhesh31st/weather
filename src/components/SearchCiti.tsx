import React, { FC, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const locationApi = "https://geocoding-api.open-meteo.com/v1/search";

type SearchCitiType = {
  setSelectLocation: (location: LocationDataType) => void;
  searchHistory: LocationDataType[];
};

const SearchCiti: FC<SearchCitiType> = ({ setSelectLocation, searchHistory }) => {
  const [userQuery, setUserQuery] = useState<string>("");
  const [location, setLocation] = useState<LocationDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userInput = useDebounce({ value: userQuery });

  useEffect(() => {
    if (userInput) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await fetch(
            `${locationApi}?name=${userInput}&count=5&language=en&format=json`
          );
          const res = await resp.json();
          setLocation(res.results);
        } catch (e: unknown) {
          setLocation([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [userInput]);

  const handleUserSelected = (location: LocationDataType) => {
    if (!searchHistory.some((prevLocation) => prevLocation.id === location.id)) {
      setUserQuery('');
      setLocation([]);
      setSelectLocation(location);
    }
  };

  return (
    <div className="flex flex-col md:w-2/12 w-full">
      <div className="flex gap-2 flex-col justify-start items-start w-full">
        <span className="font-semibold text-base flex">Search Location</span>
        <input
          type="text"
          placeholder="Search location ...."
          className={`border border-gray-500 px-6 py-2 focus:outline-none flex w-full ${
            location?.length > 0 || isLoading ? "rounded-t-md" : "rounded-md"
          }`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserQuery(e.target.value)
          }
          value={userQuery}
        />
      </div>
      {(isLoading || (location || [])?.length > 0) && (
        <div className="relative w-full">
          <div className="absolute z-30 w-full">
            <div className="flex flex-col bg-purple-200 w-full">
              {isLoading ? (
                <span className="px-6 py-2 w-full">Loading ...</span>
              ) : (
                <div className="flex flex-col w-full">
                  {(location || [])?.map((location: LocationDataType) => {
                    return (
                      <span
                        key={`search-${location.id}`}
                        className="px-6 py-2 hover:bg-purple-500 w-full cursor-pointer hover:text-white"
                        onClick={() => handleUserSelected(location)}
                      >
                        {location.country} - {location.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCiti;
