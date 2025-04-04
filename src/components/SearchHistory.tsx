import { FC } from "react";

type SearchHistoryType = {
  data: LocationDataType[];
  setSelectLocation: (location: LocationDataType) => void;
  selectLocation: LocationDataType;
};

const SearchHistory: FC<SearchHistoryType> = ({
  data,
  setSelectLocation,
  selectLocation,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-black text-base">Search history</span>
      <div className="flex flex-wrap gap-4">
        {data?.map((location: LocationDataType) => {
          return (
            <span
              key={`searchHistory-${location.id}`}
              className={`flex  px-4 py-1 rounded-md border border-gray-200   ${
                location.id === selectLocation?.id
                  ? "bg-orange-500"
                  : "cursor-pointer  hover:bg-green-800 bg-green-400 hover:text-white"
              }`}
              onClick={() =>
                selectLocation.id !== location.id && setSelectLocation(location)
              }
            >
              {location.country} - {location.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SearchHistory;
