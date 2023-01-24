import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH6 = styled.h6`
  font-family: "Open Sans";
  font-size: 18px;
  line-height: 100%;
  color: #000000;
  font-style: normal;
`;

const StyledH6Bold = styled(BaseH6)`
  font-weight: 700;
`;
const StyledH6 = styled(BaseH6)`
  font-weight: 400;
`;
const StyledH6Light = styled(BaseH6)`
  font-weight: 300;
`;

export default function H6({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH6Bold>{children}</StyledH6Bold>;
    case "regular":
      return <StyledH6>{children}</StyledH6>;
    case "light":
      return <StyledH6Light>{children}</StyledH6Light>;

    default:
      return <StyledH6>{children}</StyledH6>;
  }
}
