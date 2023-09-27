import React, { useEffect, useState } from "react";

import AutoCompleteView from "./auto-complete-view";
import { getEmployees } from "../../services/employees";
import { Employee } from "../../interfaces/employees.interface";

const AutoCompleteContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilter = async (value: string) => {
    if (value.length === 0) {
      setInputValue(value);
      return getEmployeeList();
    }

    const filteredDataMutation = filteredData.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(filteredDataMutation);

    setIsLoading(true);
    setInputValue(value);
  };

  const handleOptionSelect = (value: Employee) => {
    setInputValue(value.name);
    // here you can do anything with the selected option value
    // we can just move the getEmployeeList() to a parent component and handle the selected value there and pass the value as a prop to this component
    // and also set inputValue, filterData, isLoading, onInputChange, onOptionSelect as a props to this component and handle everything in the parent component
    // but for this test I will leave it here
    // extra note: we can also use useContext to store the selected value and use it anywhere in the app
  };

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
