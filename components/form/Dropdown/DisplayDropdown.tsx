import React, { useRef, useState } from "react";
import styled from "styled-components";

export type DropdownItem = {
  /** Name of the dropdown option. */
  name: string;

  /** Value of the dropdown option. */
  value: string;
};

export type Props = {
  /** Options that should be used as dropdown options */
  options: DropdownItem[];

  /** Placeholder for the dropdown field */
  placeholder?: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: text;

  select {
    display: none;
  }

  label {
    margin-bottom: 16px;

    font-weight: 700;
    font-size: 18px;
    line-height: 160%;
    color: #000000;
  }

  > div {
    position: relative;

    .selectBox {
      /* position: absolute; */
      /* top: 0;
      left: 0; */
      /* border: 1px solid #555555; */
      /* background-color: white; */
      /* width: 100%; */
      /* border-radius: 8px; */

      /* display: flex; */
      /* justify-content: space-between; */
      /* align-items: center; */
      /* padding: 10px 16px; */
      cursor: pointer;

      span {
        color: #888888;
        font-weight: 700;
        font-size: 48px;
        line-height: 140%;
        text-align: center;
      }

      &.open {
        border-radius: 8px 8px 0 0;
      }
    }

    .selectItems {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 8px;
      overflow: hidden;

      display: flex;
      flex-direction: column;
      cursor: pointer;

      button {
        font-weight: 700;
        font-size: 32px;
        line-height: 120%;
        border: none;
        outline: 0;

        padding: 14px 42px;

        color: #000000;

        &.active {
          background-color: #888888;
          color: white;
        }
      }
    }
  }
`;

export default function DisplayDropdown({
  options,
  placeholder = "Select",
  ...rest
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleInputFocus = () => {
    inputRef?.current?.focus();
  };

  const handleSelect = (option: DropdownItem) => {
    setSelected(option);
    setIsOpen(() => false);
  };

  return (
    <Wrapper onClick={handleInputFocus}>
      <div>
        <select
          ref={inputRef}
          placeholder={placeholder}
          onBlur={() => setIsOpen(false)}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <div
          className={`selectBox ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((state) => !state)}
        >
          <span>{selected?.name ?? placeholder}</span>
          {/* <span>{!isOpen ? <ChevronDownFilled /> : <ChevronUpFilled />}</span> */}
        </div>
        {isOpen && (
          <div className="selectItems">
            {options.map((option) => (
              <button
                className={selected?.value === option.value ? "active" : ""}
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
