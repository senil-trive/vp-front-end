import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const StyledH1 = styled.h1`
  /* H1 - Bold */

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 140%;
  /* or 67px */

  color: #000000;
`;

export default function H6({ children }: Props) {
  return <StyledH1>{children}</StyledH1>;
}
