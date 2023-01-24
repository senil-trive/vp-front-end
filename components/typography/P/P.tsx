import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  variant?: "bold" | "regular" | "italic" | "light" | "helper";
  children: ReactNode;
};

const BaseP = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-size: 16px;
  line-height: 140%;
  color: #000000;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 18px;
    line-height: 160%;
  }
`;

const StyledP = styled(BaseP)`
  font-weight: 400;
`;
const StyledPBold = styled(BaseP)`
  font-weight: 700;
`;
const StyledPItalic = styled(BaseP)`
  font-weight: 400;
  font-style: italic;
`;
const StyledPLight = styled(BaseP)`
  font-weight: 300;
`;
const StyledHelperText = styled(BaseP)`
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #000000;
`;

export default function P({ variant = "regular", children }: Props) {
  switch (variant) {
    case "bold":
      return <StyledPBold>{children}</StyledPBold>;
    case "italic":
      return <StyledPItalic>{children}</StyledPItalic>;
    case "regular":
      return <StyledP>{children}</StyledP>;
    case "light":
      return <StyledPLight>{children}</StyledPLight>;
    case "helper":
      return <StyledHelperText>{children}</StyledHelperText>;

    default:
      return <StyledP>{children}</StyledP>;
  }
}
