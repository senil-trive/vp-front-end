import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  /** Background color of the section */
  backgroundColor?: string;

  /** Content to be shown */
  children: ReactNode;
};

const Wrapper = styled.div`
  border-radius: 8px;
  padding: 51px 90px;
`;

export default function Section({
  backgroundColor = "#e5f0fe",
  children,
  ...rest
}: Props) {
  return (
    <Wrapper style={{ backgroundColor }} {...rest}>
      <div>{children}</div>
    </Wrapper>
  );
}
