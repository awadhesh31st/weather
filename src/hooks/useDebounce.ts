import { useEffect, useState } from "react"

const useDebounce = ({ value }: UseDebounceType) => {
	const [debouncedValue, setDebouncedValue] = useState<StateType>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), 500);
		return () => clearTimeout(timer);
	}, [value]);

	return debouncedValue;
};

export default useDebounce;
