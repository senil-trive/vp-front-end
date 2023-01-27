import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
  onClick?: () => void;
};

const StyledButton = styled.button<Props>`
  width: 100%;
  border-radius: 12px;

  padding: 16px;

  /* Body - Regular */
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;

  text-align: center;

  transition: box-shadow 0.3s ease-in-out;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background: #232323;
        `;
      case "secondary":
        return css`
          background: #e0e0e0;
          border: 1px solid #010101;
          color: #010101;
          &:hover {
            box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3);
          }
        `;
      case "tertiary":
        return css`
          background: transparent;
          text-decoration: underline;
          color: #010101;
          font-size: 24px;
          font-weight: 700;
          padding: 0;
          max-width: initial;
          width: initial;
        `;

      default:
        return css`
          /* TODO replace with var: $black */
          background: #232323;
          color: #ffffff;

          &:hover {
            box-shadow: inset -8px -8px 24px rgba(255, 255, 255, 0.3);
          }
        `;
    }
  }}
`;

export function Button({ variant, children, onClick, ...rest }: Props) {
  return (
    <StyledButton onClick={onClick} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}
