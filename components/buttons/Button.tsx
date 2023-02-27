import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import { CircleSpinner } from "react-spinners-kit";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link"
  | "info"
  | "infoReversed";

type Props = {
  variant?: ButtonVariant;
  filled?: boolean;
  children: ReactNode;

  /** Wether the button should be treated as a <a/> */
  href?: string;

  /** Wether the button is disabled */
  disabled?: boolean;

  /** Loading state of the button */
  loading?: boolean;

  /** Callback */
  onClick?: () => void;
};

const Style = css<Props>`
  width: 100%;
  height: 60px;
  border-radius: 12px;
  padding: 16px;
  border: none;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.p.mobile};
  color: ${({ theme }) => theme.colors.white};
  line-height: 160%;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:disabled {
    cursor: not-allowed;
  }

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

      case "info":
        return css`
          background: ${({ theme }) => theme.colors.info};
          color: #fff;
          border: 2px solid ${({ theme }) => theme.colors.info};
          &:hover {
            background: transparent;
            color: ${({ theme }) => theme.colors.info};
          }
        `;
      case "infoReversed":
        return css`
          background: transparent;
          color: ${({ theme }) => theme.colors.info};
          border: 2px solid ${({ theme }) => theme.colors.info};
          &:hover {
            background: ${({ theme }) => theme.colors.info};
            color: #ffffff;
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

  ${({ filled, variant }) =>
    !filled &&
    variant &&
    variant !== "link" &&
    css`
      background-color: white;
      color: ${({ theme }) => theme.colors[variant]};
      border: 2px solid;
    `}
  
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.p.mobile};
  }
`;

const StyledButton = styled.button`
  ${Style}
`;

const StyledLink = styled.a`
  ${Style}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export default function Button({
  variant = "primary",
  filled = true,
  children,
  onClick,
  disabled = false,
  loading = false,
  href,
  ...rest
}: Props) {
  if (href) {
    return (
      <StyledLink
        href={href}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
        filled={filled}
        {...rest}
      >
        {loading && <CircleSpinner size={20} color="#fff" />}
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      filled={filled}
      {...rest}
    >
      {loading && <CircleSpinner size={20} color="#fff" />}
      {children}
    </StyledButton>
  );
}
