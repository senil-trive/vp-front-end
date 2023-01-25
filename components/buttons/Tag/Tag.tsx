import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  size?: "m" | "l";
  children: ReactNode;
  onClick?: () => void;
};

const BaseTag = styled.span`
  background: #888888;
  border-radius: 8px;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  color: #ffffff;
`;

const StyledTag = styled(BaseTag)`
  font-size: 18px;
  line-height: 160%;
  padding: 6px 10px;
`;
const StyledTagSmall = styled(BaseTag)`
  font-size: 10px;
  padding: 8px;
  line-height: 120%;
`;

export default function Tag({ size = "l", onClick, children, ...rest }: Props) {
  switch (size) {
    case "m":
      return (
        <StyledTagSmall onClick={onClick} {...rest}>
          {children}
        </StyledTagSmall>
      );

    default:
      return (
        <StyledTag onClick={onClick} {...rest}>
          {children}
        </StyledTag>
      );
  }
}
