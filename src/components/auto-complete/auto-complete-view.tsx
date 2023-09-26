import React, { useState } from "react";

import "./auto-complete-styles.css";

interface AutoCompleteViewProps {
  inputValue: string;
  filteredData: string[];
  isLoading: boolean;
  selectedOption?: string;
  onInputChange: (value: string) => void;
  onOptionSelect: (value: string) => void;
}

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
    onOptionSelect(e.currentTarget.dataset.value || "");
    setShowCloseButton(true);
    setShowOptions(false);
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
        placeholder="Type here..."
      />
      {showOptions && (
        <>
          {filteredData.length > 0 && (
            <ul className="autoComplete__menu">
              {filteredData.map((item, index) => {
                const startIndex = item
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase());
                const endIndex = startIndex + inputValue.length;

                return (
                  <li
                    key={index}
                    data-value={item}
                    onClick={handleOptionSelect}
                  >
                    {startIndex > 0 && (
                      <span>{item.substring(0, startIndex)}</span>
                    )}
                    <strong>{item.substring(startIndex, endIndex)}</strong>
                    {endIndex < item.length && (
                      <span>{item.substring(endIndex)}</span>
                    )}
                  </li>
                );
              })}
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
