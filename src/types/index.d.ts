type LocationDataType = {
	admin1: string;
	admin1_id: number;
	admin2: string;
	admin2_id: number;
	admin3: string;
	admin3_id: number;
	country: string;
	country_code: string;
	country_id: number;
	elevation: number;
	feature_code: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	population: number;
	postcodes: string[];
	timezone: string;
};

type ForecastDataType = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: {
		time: string;
		interval: string;
		temperature_2m: string;
		relative_humidity_2m: string;
		apparent_temperature: string;
		precipitation: string;
		wind_speed_10m: string;
	};
	current: {
		time: string;
		interval: number;
		temperature_2m: number;
		relative_humidity_2m: number;
		apparent_temperature: number;
		precipitation: number;
		wind_speed_10m: number;
	};
	daily_units: {
		time: string;
		temperature_2m_max: string;
		temperature_2m_min: string;
		precipitation_sum: string;
	};
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		precipitation_sum: number[];
	};
};


type StateType = string | { latitude: number; longitude: number };
type UseDebounceType = {
	value: StateType;
};

type UseDebounceReturnType = {
	location: LocationData[] | null;
	forecast: ForecastDataType | null;
	isLoading: boolean;
}