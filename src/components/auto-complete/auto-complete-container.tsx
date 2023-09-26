import React, { useState } from "react";

import AutoCompleteView from "./auto-complete-view";
import mockData from "../../mocks/input-values";
import { getEmployees } from "../../services/employees";

const AutoCompleteContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string[]>(mockData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilter = async (value: string) => {
    setIsLoading(true);
    setInputValue(value);

    const employees = await getEmployees();
    setFilteredData(employees);
    setIsLoading(false);
  };

  const handleOptionSelect = (value: string) => setInputValue(value);

  return (
    <AutoCompleteView
      inputValue={inputValue}
      filteredData={filteredData}
      isLoading={isLoading}
      onInputChange={handleFilter}
      onOptionSelect={handleOptionSelect}
    />
  );
};

export default AutoCompleteContainer;
