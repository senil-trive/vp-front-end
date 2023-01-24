import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH4 = styled.h4`
  font-family: "Open Sans";
  font-size: 24px;
  line-height: 115%;
  color: #000000;
  font-style: normal;
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

export default function H4({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH4Bold>{children}</StyledH4Bold>;
    case "regular":
      return <StyledH4>{children}</StyledH4>;
    case "light":
      return <StyledH4Light>{children}</StyledH4Light>;

    default:
      return <StyledH4>{children}</StyledH4>;
  }
}
