import React, { ReactNode, useRef } from "react";
import styled, { css } from "styled-components";
import { InputStateType, InputType } from "../../../types/formTypes";
import IconWrapper from "../../icons/IconWrapper/IconWrapper";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography";

type Props = {
  /** Label of the input field. */
  label?: string;

  /** React or custom Icon to be placed in front of the input  */
  iconLeft?: ReactNode;

  /** React or custom Icon to be placed in after of the input  */
  iconRight?: ReactNode;

  /** Small text that will appear under the input field. */
  helperText?: string;

  /** Type of input. Same as HTML Input type. */
  type?: InputType;

  /** Placeholder for the input field */
  placeholder?: string;

  /** Wether the  input field should be disabled */
  disabled?: boolean;

  /** Wether the  input field is active */
  active?: boolean;

  /** Wether the  input field is required */
  required?: boolean;

  /** Wether the  input field has errors */
  hasError?: boolean;

  /** Name of the input field. required for submitting the form */
  name?: string;

  defaultValue?: string;

  /** Callback to handle the input */
  onChange?: (x: string) => void;

  /** React hook form register function for error handling */
  register?: any;
};

const InputWrapper = styled.div<InputStateType>`
  display: flex;
  flex-direction: column;
  cursor: text;

  label {
    margin-bottom: 16px;

    font-weight: 700;
    font-size: 18px;
    line-height: 160%;
    /* identical to box height, or 29px */

    color: #000000;
  }

  > div {
    border: 1px solid #555555;
    background-color: white;
    width: 100%;
    border-radius: 8px;

    display: flex;
    align-items: center;
    padding: 10px 12px 10px 16px;

    input {
      border: none;
      width: 100%;
      border-radius: 8px;

      font-weight: 400;
      font-size: 18px;
      line-height: 160%;

      color: #888888;
      background-color: transparent;

      &:focus {
        outline: 0;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    margin-top: 13.5px;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          > div {
            opacity: 0.3;
            input {
              cursor: not-allowed;
            }
          }

          footer {
            opacity: 0.3;
          }
        `
      : null}

  ${({ active }) =>
    active
      ? css`
          > div {
            border-color: #black;
          }
        `
      : null}

  ${({ hasError }) =>
    hasError
      ? css`
          > div {
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

export default function Input({
  iconLeft,
  iconRight,
  type = "text",
  label,
  helperText,
  placeholder = "Enter a value",
  active = false,
  disabled = false,
  hasError = false,
  defaultValue = "",
  name,
  onChange,
  register,
  required,
  ...rest
}: Props) {
  const formRegister =
    register && name
      ? register(name, {
          required: required ? "This field can't be empty" : null,
        })
      : {};

  return (
    <InputWrapper disabled={disabled} active={active} hasError={hasError}>
      {!!label && <label>{label}</label>}
      <div>
        {!!iconLeft && (
          <IconWrapper style={{ marginRight: 10 }}>{iconLeft}</IconWrapper>
        )}
        <input
          type={type}
          onChange={(e) => onChange?.(e.target.value)}
          {...formRegister}
          {...rest}
        />
        {!!iconRight && (
          <IconWrapper style={{ marginLeft: 10 }}>{iconRight}</IconWrapper>
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
    </InputWrapper>
  );
}
