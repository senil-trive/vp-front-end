import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import { Grid } from "../";

type Props = {
  center?: boolean;
  children: ReactNode;
  style?: React.CSSProperties;
  imageUrl?: string;
};

const Wrapper = styled.div<{ center: boolean; bgn?: string }>`
  padding: 29px 41px 40px 41px;
  position: relative;

  ${({ center }) =>
    center &&
    css`
      display: flex;
      align-items: center;
    `}

  ${({ bgn }) =>
    bgn &&
    css`
      background-image: url(${bgn});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}

  .inner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function Hero({
  children,
  center = false,
  imageUrl,
  style,
}: Props) {
  return (
    <Wrapper bgn={imageUrl} center={center} style={style}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12}>
          <div className="inner">{children}</div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
