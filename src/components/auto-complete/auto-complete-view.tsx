import React, { useState, useEffect } from "react";

import "./auto-complete-styles.css";
import { Employee } from "../../interfaces/employees";
import { AutoCompleteViewProps } from "./auto-complete-interface";

const AutoCompleteView: React.FC<AutoCompleteViewProps> = ({
  inputValue,
  filteredData,
  isLoading,
  onInputChange,
  onOptionSelect,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
    setShowOptions(true);
  };

  const handleOptionSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const option: Employee | undefined = filteredData.find(
      (item) => item.id === Number(e.currentTarget.dataset.value)
    );
    if (option) {
      onOptionSelect(option);
      setShowCloseButton(true);
      setShowOptions(false);
    }
  };

  const handleClearInput = () => {
    onInputChange("");
    setShowCloseButton(false);
    focusInput();
    setShowOptions(false);
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);

    if (!showOptions) {
      setShowOptions(true);
    }
  };

  const handleClickedOutside = (e: MouseEvent) => {
    const optionsContainer = document.getElementById("options");

    if (
      optionsContainer?.contains(e.target as Node) ||
      inputRef.current?.contains(e.target as Node)
    ) {
      return;
    }

    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickedOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  });

  return (
    <div className="autoComplete">
      {showCloseButton && (
        <div
          className="autoComplete__close"
          aria-label="Close"
          onClick={handleClearInput}
        >
          x
        </div>
      )}
      <input
        ref={inputRef}
        className="autoComplete__input"
        type="text"
        value={inputValue}
        onChange={handleInputOnChange}
        onFocus={focusInput}
        placeholder="Enter the employee name"
      />
      {showOptions && (
        <>
          {filteredData.length > 0 && (
            <ul className="autoComplete__menu" id="options">
              {filteredData.map((item, index) => {
                const startIndex = item.name
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase());
                const endIndex = startIndex + inputValue.length;

                return (
                  <li
                    key={`${item.id}-${index}`}
                    data-value={item.id}
                    onClick={handleOptionSelect}
                  >
                    {startIndex > 0 && (
                      <span>{item.name.substring(0, startIndex)}</span>
                    )}
                    <strong>{item.name.substring(startIndex, endIndex)}</strong>
                    {endIndex < item.name.length && (
                      <span>{item.name.substring(endIndex)}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {!isLoading && inputValue.length > 0 && !filteredData.length && (
            <div>No match</div>
          )}
        </>
      )}
    </div>
  );
};

export default AutoCompleteView;
