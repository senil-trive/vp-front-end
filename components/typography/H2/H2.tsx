import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH2 = styled.h2`
  font-family: "Open Sans";
  font-size: 24px;
  line-height: 120%;
  color: #000000;
  font-style: normal;

  @media ${({ theme }) => theme.devices.tablet} {
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

export default function H2({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH2Bold>{children}</StyledH2Bold>;
    case "regular":
      return <StyledH2>{children}</StyledH2>;
    case "light":
      return <StyledH2Light>{children}</StyledH2Light>;

    default:
      return <StyledH2>{children}</StyledH2>;
  }
}
