import React, { ReactNode } from "react";

import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  color?: "blue" | "black";
  children: ReactNode;
  style?: React.CSSProperties;
};

const BaseH5 = styled.h5`
  font-size: 20px;
  line-height: 110%;
  color: ${({ theme, color }) =>
    color === "blue" ? theme.colors.primary : theme.colors.text};
  font-style: normal;
  margin: 12px 0;
`;

const StyledH5Bold = styled(BaseH5)`
  font-weight: 700;
`;
const StyledH5 = styled(BaseH5)`
  font-weight: 400;
`;
const StyledH5Light = styled(BaseH5)`
  font-weight: 300;
`;

export default function H5({
  variant = "regular",
  children,
  color = "black",
  ...rest
}: Props) {
  switch (variant) {
    case "bold":
      return (
        <StyledH5Bold color={color} {...rest}>
          {children}
        </StyledH5Bold>
      );
    case "regular":
      return (
        <StyledH5 color={color} {...rest}>
          {children}
        </StyledH5>
      );
    case "light":
      return (
        <StyledH5Light color={color} {...rest}>
          {children}
        </StyledH5Light>
      );

    default:
      return (
        <StyledH5 color={color} {...rest}>
          {children}
        </StyledH5>
      );
  }
}
