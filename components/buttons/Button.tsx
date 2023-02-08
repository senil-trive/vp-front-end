import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  children: ReactNode;
  onClick?: () => void;
};

const StyledButton = styled.button<Props>`
  width: 100%;
  border-radius: 12px;
  padding: 16px;
  border: none;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.p.mobile};
  color: ${({ theme }) => theme.colors.white};
  line-height: 160%;
  text-align: center;
  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return css`
          background: ${({ theme }) => theme.colors.secondary};
          &:hover {
            box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3);
          }
        `;
      case "tertiary":
        return css`
          background: ${({ theme }) => theme.colors.tertiary};
          &:hover {
            box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3);
          }
        `;
      case "link":
        return css`
          background: transparent;
          text-decoration: underline;
          color: #010101;
          font-size: 24px;
          font-weight: 700;
          padding: 0;
          max-width: initial;
          width: initial;
          &:hover {
            color: ${({ theme }) => theme.colors.primary};
          }
        `;

      default:
        return css`
          background: ${({ theme }) => theme.colors.primary};
          color: #ffffff;

          &:hover {
            /* background: ${({ theme }) => theme.colors.black}; */
            box-shadow: inset -8px -8px 24px rgba(0, 0, 0, 0.3);
          }
        `;
    }
  }}

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.p.mobile};
  }
`;

export default function Button({
  variant = "primary",
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <StyledButton onClick={onClick} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}
