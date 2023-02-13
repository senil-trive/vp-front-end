import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: "bold" | "regular" | "light";
  children: ReactNode;
};

const BaseH1 = styled.h1`
  font-size: 32px;
  line-height: 120%;
  color: #000000;
  font-style: normal;
  margin: 12px 0;

  @media ${({ theme }) => theme.devices.tablet} {
    margin: 24px 0;
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

export default function H1({ variant = "regular", children, ...rest }: Props) {
  switch (variant) {
    case "bold":
      return <StyledH1Bold {...rest}>{children}</StyledH1Bold>;
    case "regular":
      return <StyledH1 {...rest}>{children}</StyledH1>;
    case "light":
      return <StyledH1Light {...rest}>{children}</StyledH1Light>;

    default:
      return <StyledH1 {...rest}>{children}</StyledH1>;
  }
}
