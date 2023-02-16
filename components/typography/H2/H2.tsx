import React, { ReactNode } from "react";

import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  color?: "blue" | "black";
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH2 = styled.h2`
  font-size: 24px;
  line-height: 120%;
  color: ${({ theme, color }) =>
    color === "blue" ? theme.colors.primary : theme.colors.text};
  font-style: normal;
  margin: 12px 0;

  @media ${({ theme }) => theme.devices.tablet} {
    margin: 18px 0;
    font-size: 40px;
    line-height: 130%;
  }
`;

const StyledH2Bold = styled(BaseH2)`
  font-weight: 700;
`;
const StyledH2 = styled(BaseH2)`
  font-weight: 400;
`;
const StyledH2Light = styled(BaseH2)`
  font-weight: 300;
`;

export default function H2({
  variant = "regular",
  color = "black",
  children,
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH2Bold color={color} {...rest}>
          {children}
        </StyledH2Bold>
      );
    case "regular":
      return (
        <StyledH2 color={color} {...rest}>
          {children}
        </StyledH2>
      );
    case "light":
      return (
        <StyledH2Light color={color} {...rest}>
          {children}
        </StyledH2Light>
      );

    default:
      return (
        <StyledH2 color={color} {...rest}>
          {children}
        </StyledH2>
      );
  }
}
