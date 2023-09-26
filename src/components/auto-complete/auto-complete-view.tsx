import React, { useState } from "react";

interface AutoCompleteViewProps {
  inputValue: string;
  filteredData: string[];
  isLoading: boolean;
  onInputChange: (value: string) => void;
}

const AutoCompleteView: React.FC<AutoCompleteViewProps> = ({
  inputValue,
  filteredData,
  isLoading,
  onInputChange,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type here..."
      />
      {isLoading && <div>Loading...</div>}
      {isInputFocused && (
        <>
          {filteredData.length > 0 && (
            <ul>
              {filteredData.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {!isLoading && inputValue.length > 0 && filteredData.length === 0 && (
            <div>No hay coincidencias</div>
          )}
        </>
      )}
    </div>
  );
};

export default AutoCompleteView;
