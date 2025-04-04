import { useState } from "react";
import SearchCiti from "./components/SearchCiti";
import SearchHistory from "./components/SearchHistory";
import Forecast from "./components/Forecast";

const App = () => {
  const [selectLocation, setSelectLocation] = useState<LocationDataType | null>(null);
  const [searchHistory, setSearchHistory] = useState<LocationDataType[]>([]);

  const saveLocation = (location: LocationDataType) => {
    setSelectLocation(location);
    setSearchHistory((oldSearchLocation) => [
      ...oldSearchLocation,
      ...[location],
    ]);
  };

  return (
    <div className="flex flex-col p-4 gap-6">
      {searchHistory?.length > 0 && (
        <SearchHistory
          data={searchHistory}
          selectLocation={selectLocation as LocationDataType}
          setSelectLocation={setSelectLocation}
        />
      )}
      <SearchCiti
        setSelectLocation={saveLocation}
        searchHistory={searchHistory}
      />
      {selectLocation && <Forecast forecast={selectLocation} />}
    </div>
  );
};

export default App;
