import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import ChevronDownFilled from "../../icons/ChevronDownFilled/ChevronDownFilled";
import ChevronUpFilled from "../../icons/ChevronUpFilled/ChevronUpFilled";
import IconWrapper from "../../icons/IconWrapper/IconWrapper";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography";

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

  /** Wether the  input field is required */
  required?: boolean;

  /** Name of the input field. required for submitting the form */
  name: string;

  /** React hook form register function for error handling */
  register?: any;
};

const Wrapper = styled.div<{ hasError: boolean }>`
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

  .selectBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #555555;
    background-color: white;
    width: 100%;
    border-radius: 8px;

    display: flex;
    align-items: center;
    padding: 10px 16px;

    span {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
    }

    &.open {
      border-radius: 8px 8px 0 0;
    }
  }

  .selectItems {
    border: 1px solid #555555;
    border-top-width: 0;
    background-color: white;
    width: 100%;
    border-radius: 0 0 8px 8px;

    display: flex;
    flex-direction: column;
    padding: 6.18px 16px 10px 16px;

    button {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      width: 100%;
      border: none;
      outline: 0;
      text-align: left;
      background-color: white;
      padding: 0;

      color: #000000;
    }
  }

  footer {
    display: flex;
    align-items: center;
    margin-top: 13.5px;
  }

  ${({ hasError }) =>
    hasError
      ? css`
          .selectBox {
            background-color: rgba(255, 51, 51, 0.1);
            border-color: #ff3333;
          }

          footer {
            svg path {
              fill: #ff3333;
            }
            p {
              color: #ff3333;
            }
          }
        `
      : null}
`;

export default function Dropdown({
  options,
  label,
  disabled,
  helperText,
  placeholder = "Select",
  hasError = false,
  register,
  name,
  required,
  ...rest
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const inputRef = useRef<HTMLSelectElement>(null);

  const formRegister = register
    ? register(name, {
        required: required ? "Dit veld is verplicht" : null,
      })
    : {};

  const handleInputFocus = () => {
    inputRef?.current?.focus();
  };

  const handleSelect = (option: DropdownItem) => {
    setSelected(option);
    setIsOpen(() => false);
  };

  return (
    <Wrapper hasError={hasError} onClick={handleInputFocus}>
      {!!label && <label>{label}</label>}
      <div>
        <select
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          {...formRegister}
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
          <span>{selected?.name || placeholder}</span>
          <span>{!isOpen ? <ChevronDownFilled /> : <ChevronUpFilled />}</span>
        </div>
        {isOpen && (
          <div className="selectItems">
            {options.map((option) => (
              <button key={option.value} onClick={() => handleSelect(option)}>
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {!!helperText && (
        <footer>
          <IconWrapper style={{ marginRight: 16 }}>
            <ImportantCircle />
          </IconWrapper>
          <P variant="helper" style={{ margin: 0 }}>
            {helperText}
          </P>
        </footer>
      )}
    </Wrapper>
  );
}
