import React, { ReactNode } from "react";

import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  color?: "blue" | "black";
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH4 = styled.h4`
  font-size: 24px;
  line-height: 115%;
  color: ${({ theme, color }) =>
    color === "blue" ? theme.colors.primary : theme.colors.text};
  font-style: normal;
  margin: 12px 0;
`;

const StyledH4Bold = styled(BaseH4)`
  font-weight: 700;
`;
const StyledH4 = styled(BaseH4)`
  font-weight: 400;
`;
const StyledH4Light = styled(BaseH4)`
  font-weight: 300;
`;

export default function H4({
  variant = "regular",
  children,
  color = "black",
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH4Bold color={color} {...rest}>
          {children}
        </StyledH4Bold>
      );
    case "regular":
      return (
        <StyledH4 color={color} {...rest}>
          {children}
        </StyledH4>
      );
    case "light":
      return (
        <StyledH4Light color={color} {...rest}>
          {children}
        </StyledH4Light>
      );

    default:
      return (
        <StyledH4 color={color} {...rest}>
          {children}
        </StyledH4>
      );
  }
}