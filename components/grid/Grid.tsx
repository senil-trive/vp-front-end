import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 32px;
  max-width: 1384px;
  margin: 0 auto;
`;

export default function Grid({ children, ...rest }: Props) {
  return <StyledGrid {...rest}>{children}</StyledGrid>;
}
