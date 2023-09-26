import React, { useState } from "react";

import AutoCompleteView from "./auto-complete-view";
import mockData from "../../mocks/input-values";

const AutoCompleteContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = async (value: string) => {
    setIsLoading(true);
    setInputValue(value);

    setTimeout(() => {
      const filtered = mockData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AutoCompleteView
      inputValue={inputValue}
      filteredData={filteredData}
      isLoading={isLoading}
      onInputChange={handleFilter}
    />
  );
};

export default AutoCompleteContainer;
