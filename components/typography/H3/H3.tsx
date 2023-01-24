import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH3 = styled.h3`
  font-family: "Open Sans";
  font-size: 32px;
  line-height: 120%;
  color: #000000;
  font-style: normal;
`;

const StyledH3Bold = styled(BaseH3)`
  font-weight: 700;
`;
const StyledH3 = styled(BaseH3)`
  font-weight: 400;
`;
const StyledH3Light = styled(BaseH3)`
  font-weight: 300;
`;

export default function H3({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH3Bold>{children}</StyledH3Bold>;
    case "regular":
      return <StyledH3>{children}</StyledH3>;
    case "light":
      return <StyledH3Light>{children}</StyledH3Light>;

    default:
      return <StyledH3>{children}</StyledH3>;
  }
}
