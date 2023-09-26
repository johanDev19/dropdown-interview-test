import { Employee } from "../../interfaces/employees";

export interface AutoCompleteViewProps {
  inputValue: string;
  filteredData: Employee[];
  isLoading: boolean;
  selectedOption?: string;
  onInputChange: (value: string) => void;
  onOptionSelect: (value: Employee) => void;
}
