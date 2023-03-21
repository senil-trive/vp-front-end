import React, { ReactNode, useRef, useState } from "react";
import styled, { css, useTheme } from "styled-components";

import ChevronDownFilled from "../../icons/ChevronDownFilled/ChevronDownFilled";
import ChevronUpFilled from "../../icons/ChevronUpFilled/ChevronUpFilled";
import { ColorType } from "../../../types/colorTypes";
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

  /** React or custom Icon to be placed in front of the input  */
  iconLeft?: ReactNode;

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

  /** The color of the border */
  borderColor?: ColorType;

  /** Event called when the dropdown changes */
  onChange?: (x: string) => void;
};

const Wrapper = styled.div<{ hasError: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

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
    border: 1px solid;
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
    border: 1px solid;
    border-top-width: 0;
    background-color: white;
    width: 100%;
    border-radius: 0 0 8px 8px;
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 6.18px 0 10px 0;

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
      padding: 0 16px;

      color: #000000;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.normal};
        color: ${({ theme }) => theme.colors.white};
      }
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
  iconLeft,
  options,
  label,
  disabled,
  helperText,
  placeholder = "Kies een optie",
  hasError = false,
  register,
  name,
  required,
  borderColor = "primary",
  onChange,
  ...rest
}: Props) {
  const { colors } = useTheme();
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

    if (onChange) onChange(option.value);
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
          style={{ borderColor: colors[borderColor].normal }}
          onClick={() => setIsOpen((state) => !state)}
        >
          <div className="flex items-center">
            {!!iconLeft && (
              <IconWrapper style={{ marginRight: 10 }}>{iconLeft}</IconWrapper>
            )}
            <span>{selected?.name || placeholder}</span>
          </div>
          <span>
            {!isOpen ? (
              <ChevronDownFilled color={borderColor} />
            ) : (
              <ChevronUpFilled color={borderColor} />
            )}
          </span>
        </div>
        {isOpen && (
          <div
            className="selectItems"
            style={{ borderColor: colors[borderColor].normal }}
          >
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
