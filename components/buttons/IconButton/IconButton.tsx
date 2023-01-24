import React from "react";
import { IconType } from "react-icons/lib";
import styled from "styled-components";

type Props = {
  iconSize?: "s" | "m " | "l" | number;
  iconColor?: string;
  Icon: IconType;
  onClick?: () => void;
};

const IconWrapper = styled.div`
  background-color: white;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function IconButton({
  Icon,
  iconColor = "black",
  iconSize = 32,
  onClick,
  ...rest
}: Props) {
  return (
    <IconWrapper onClick={onClick} {...rest}>
      <Icon color={iconColor} size={iconSize} />
    </IconWrapper>
  );
}
