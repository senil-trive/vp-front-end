import React, { ReactNode } from "react";
import styled from "styled-components";
import { Grid } from "../";

type Props = {
  children: ReactNode;
};

const Wrapper = styled.div`
  height: 481px;
  padding: 29px 41px 40px 41px;

  .inner {
    border: solid;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function Hero({ children }: Props) {
  return (
    <Wrapper>
      <div className="inner">
        <Grid>
          <Grid xs={12}>{children}</Grid>
        </Grid>
      </div>
    </Wrapper>
  );
}
