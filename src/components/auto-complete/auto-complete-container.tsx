import React, { useEffect, useState } from "react";

import AutoCompleteView from "./auto-complete-view";
import mockData from "../../mocks/input-values";
import { getEmployees } from "../../services/employees";

const AutoCompleteContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string[]>(mockData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilter = async (value: string) => {
    if (value.length === 0) {
      setInputValue(value);
      return getEmployeeList();
    }

    const filteredDataMutation = filteredData.filter((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(filteredDataMutation);

    setIsLoading(true);
    setInputValue(value);
  };

  const handleOptionSelect = (value: string) => setInputValue(value);

  const getEmployeeList = async () => {
    const employees = await getEmployees();
    setFilteredData(employees);
    setIsLoading(false);
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

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
