import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH5 = styled.h5`
  font-size: 20px;
  line-height: 110%;
  color: #000000;
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

export default function H5({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH5Bold>{children}</StyledH5Bold>;
    case "regular":
      return <StyledH5>{children}</StyledH5>;
    case "light":
      return <StyledH5Light>{children}</StyledH5Light>;

    default:
      return <StyledH5>{children}</StyledH5>;
  }
}
