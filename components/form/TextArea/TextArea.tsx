import React, { ReactNode, useRef } from "react";
import styled, { css } from "styled-components";
import { InputType } from "../../../types/formTypes";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography/Typography";

type Props = {
  /** Label of the input field. */
  label?: string;

  /** Small text that will appear under the input field. */
  helperText?: string;

  /** Placeholder for the input field */
  placeholder?: string;

  /** Wether the  input field should be disabled */
  disabled?: boolean;

  /** Wether the  input field is active */
  active?: boolean;
};

const Wrapper = styled.div<{ disabled: boolean; active: boolean }>`
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

    textarea {
      border: none;
      width: 100%;
      border-radius: 8px;

      font-weight: 400;
      font-size: 18px;
      line-height: 160%;

      color: #888888;

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
`;

const StyledIconWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = ({
  children,
  ...rest
}: {
  children: ReactNode;
  style?: {};
}) => {
  return <StyledIconWrapper {...rest}>{children}</StyledIconWrapper>;
};

export default function TextArea({
  label,
  helperText,
  placeholder = "Enter a value",
  active = false,
  disabled = false,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputFocus = () => {
    inputRef?.current?.focus();
  };

  return (
    <Wrapper disabled={disabled} active={active} onClick={handleInputFocus}>
      {!!label && <label>{label}</label>}
      <div>
        <textarea
          rows={7}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
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
