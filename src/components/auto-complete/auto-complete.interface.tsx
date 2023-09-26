import { Employee } from "../../interfaces/employees.interface";

export interface AutoCompleteViewProps {
  inputValue: string;
  filteredData: Employee[];
  isLoading: boolean;
  selectedOption?: string;
  onInputChange: (value: string) => void;
  onOptionSelect: (value: Employee) => void;
}
