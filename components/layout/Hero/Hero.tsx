import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import { Grid } from "../";

type Props = {
  center?: boolean;
  children: ReactNode;
  style?: React.CSSProperties;
  imageUrl?: string;
  showTags?: boolean;
  mbgn?: string;
};
const Wrapper = styled.div<{
  center: boolean;
  bgn?: string;
  showTags?: boolean;
  mbgn?: string;
}>`
  padding: 29px 41px 40px 41px;
  position: relative;

  ${({ center }) =>
    center &&
    css`
      display: flex;
      align-items: center;
    `}
  ${({ bgn, mbgn }) =>
    bgn &&
    css`
      background-image: url(${bgn});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      @media (max-width: 767px) {
        background-image: url(${mbgn ? mbgn : bgn});
      }
    `}

  .inner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 767px) {
    ${({ showTags }) =>
      showTags
        ? css`
            min-height: inherit !important;
            height: 512px;
          `
        : css`
            min-height: inherit !important;
            height: 464px;
          `};
    padding: 29px 10px 40px 10px;
  }
`;

export default function Hero({
  children,
  center = false,
  imageUrl,
  mbgn,
  style,
  showTags,
}: Props) {
  console.log(showTags);
  return (
    <Wrapper
      bgn={imageUrl}
      center={center}
      style={style}
      showTags={showTags}
      mbgn={mbgn}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12}>
          <div className="inner mt-[-60px] sm:mt-0">{children}</div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
