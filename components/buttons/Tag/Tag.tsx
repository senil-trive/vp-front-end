import { type } from "os";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type Variant = { variant?: "light" | "dark" };
type Position = { position?: "tl" | "tr" | "bl" | "br" };

type Props = React.HTMLAttributes<HTMLSpanElement> &
  Variant &
  Position & {
    /* size Size of the component */
    size?: "m" | "l";
    children: ReactNode;
    onClick?: () => void;
  };

const BaseTag = styled.span<Variant & Position>`
  background: ${({ variant, theme }) =>
    variant === "light" ? "transparent" : theme.colors.primary};
  border-radius: 8px;

  color: ${({ variant, theme }) =>
    variant === "light" ? theme.colors.primary : "white"};
  border: 1px solid ${({ theme }) => theme.colors.primary};

  font-weight: 300;

  line-height: 160%;

  ${({ position }) => {
    switch (position) {
      case "tl":
        return css`
          position: absolute;
          top: 24px;
          left: 24px;
        `;
      case "tr":
        return css`
          position: absolute;
          top: 24px;
          right: 24px;
        `;
      case "br":
        return css`
          position: absolute;
          bottom: 24px;
          right: 24px;
        `;
      case "bl":
        return css`
          position: absolute;
          bottom: 24px;
          left: 24px;
        `;

      default:
        return;
    }
  }}
`;

const StyledTag = styled(BaseTag)`
  line-height: 160%;
  padding: 14.5px 24px;
  font-size: ${({ theme }) => theme.fontSizes.p.mobile};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.p.desktop};
  }
`;

const StyledTagSmall = styled(BaseTag)`
  font-size: 10px;
  padding: 8px;
  line-height: 120%;
  padding: 6px 10px;
  font-size: ${({ theme }) => theme.fontSizes.p.mobile};
`;

export default function Tag({
  variant = "light",
  size = "l",
  onClick,
  children,
  position,
  ...rest
}: Props) {
  switch (size) {
    case "m":
      return (
        <StyledTagSmall
          position={position}
          onClick={onClick}
          variant={variant}
          {...rest}
        >
          {children}
        </StyledTagSmall>
      );

    default:
      return (
        <StyledTag
          position={position}
          onClick={onClick}
          variant={variant}
          {...rest}
        >
          {children}
        </StyledTag>
      );
  }
}
