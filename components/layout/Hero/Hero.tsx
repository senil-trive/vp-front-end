import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Grid } from "../";

type Props = {
  center?: boolean;
  children: ReactNode;
  style?: React.CSSProperties;
};

const Wrapper = styled.div<{ center: boolean }>`
  min-height: 481px;
  padding: 29px 41px 40px 41px;
  position: relative;

  ${({ center }) =>
    center &&
    css`
      display: flex;
      align-items: center;
    `}

  .inner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* @media ${({ theme }) => theme.devices.laptop} {
    &:before {
      content: "";
      background: url("/Hero-bg-left.png");
      background-repeat: repeat-y;
      background-size: 377px, 407px, auto;
      height: 100%;
      width: 377px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
    &:after {
      content: "";
      background: url("/Hero-bg-right.png");
      background-repeat: repeat-y;
      background-position: right;
      background-size: 377px, 407px, auto;
      height: 100%;
      width: 377px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }
  } */
`;

export default function Hero({ children, center = false, style }: Props) {
  return (
    <Wrapper center={center} style={style}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12}>
          <div className="inner">{children}</div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
