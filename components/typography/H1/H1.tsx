import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH1 = styled.h1`
  font-family: "Open Sans";
  font-size: 32px;
  line-height: 120%;
  color: #000000;
  font-style: normal;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 48px;
    line-height: 140%;
  }
`;

const StyledH1Bold = styled(BaseH1)`
  font-weight: 700;
`;
const StyledH1 = styled(BaseH1)`
  font-weight: 400;
`;
const StyledH1Light = styled(BaseH1)`
  font-weight: 300;
`;

export default function H1({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH1Bold>{children}</StyledH1Bold>;
    case "regular":
      return <StyledH1>{children}</StyledH1>;
    case "light":
      return <StyledH1Light>{children}</StyledH1Light>;

    default:
      return <StyledH1>{children}</StyledH1>;
  }
}
