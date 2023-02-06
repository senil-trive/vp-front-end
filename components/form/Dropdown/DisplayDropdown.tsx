import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import ChevronDownFilled from "../../icons/ChevronDownFilled/ChevronDownFilled";
import ChevronUpFilled from "../../icons/ChevronUpFilled/ChevronUpFilled";
import IconWrapper from "../../icons/IconWrapper/IconWrapper";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography/Typography";

export type DropdownItem = {
  /** Name of the dropdown option. */
  name: string;

  /** Value of the dropdown option. */
  value: string;
};

export type Props = {
  /** Label of the dropdown field. */
  label?: string;

  /** Options that should be used as dropdown options */
  options: DropdownItem[];

  /** Small text that will appear under the dropdown field. */
  helperText?: string;

  /** Placeholder for the dropdown field */
  placeholder?: string;

  /** Wether the dropdown field should be disabled */
  disabled?: boolean;

  /** Wether the dropdown field is active */
  active?: boolean;

  /** Wether the  dropdown field has any error */
  hasError?: boolean;
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
  label,
  disabled,
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
          disabled={disabled}
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
