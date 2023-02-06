import React, { useState } from "react";
import styled from "styled-components";
import CheckmarkIcon from "../../icons/Checkmark/CheckmarkIcon";

export type Props = {
  /** Label of the dropdown field. */
  label?: string;

  /** Wheter the checkbox should be default checked */
  checked?: boolean;

  /** Wether the  dropdown field has any error */
  hasError?: boolean;
};

const Wrapper = styled.div<{ hasError: boolean }>`
  display: flex;
  align-items: center;

  button {
    width: 18px;
    height: 18px;
    background: #ffffff;
    border: 1px solid #555555;
    border-radius: 4px;
    margin-right: 16px;
    position: relative;
    padding: 0;

    svg {
      position: absolute;
      top: 0%;
      left: 0%;
      transform: translate(2px, 3px);
      path {
        fill: #ffffff;
      }
    }

    &.checked {
      background-color: #555555;
    }
  }

  label {
    font-weight: 400;
    font-size: 18px;
    line-height: 160%;
    color: #000000;
  }
`;

export default function Checkbox({
  hasError = false,
  label,
  checked = true,
}: Props) {
  const [isChecked, setChecked] = useState(checked);

  const handleClick = () => {
    setChecked((val) => !val);
  };

  return (
    <Wrapper hasError={hasError} onClick={handleClick}>
      <button className={isChecked ? "checked" : ""}>
        {isChecked ? <CheckmarkIcon /> : ""}
      </button>
      <label>{label}</label>
    </Wrapper>
  );
}
