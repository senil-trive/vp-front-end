import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children?: ReactNode;
};

const StyledGridItem = styled.div<Props>`
  grid-column: span ${({ size }) => size};
`;

export default function GridItem({ size = 1, children, ...rest }: Props) {
  return (
    <StyledGridItem size={size} {...rest}>
      {children}
    </StyledGridItem>
  );
}
