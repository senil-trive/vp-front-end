import React, { ReactNode } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";
import styled from "styled-components";

const DynamicHeader = dynamic(() => import("../Header/Header"), {
  loading: () => <>Loading...</>,
});
const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  loading: () => <>Loading...</>,
});

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .page-content {
    flex: 1 0 auto;
  }

  footer {
    flex-shrink: 0;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    &:before {
      content: "";
      background: url("/Hero-bg-left.png");
      background-repeat: repeat-y;
      background-size: 377px, 407px, auto;
      height: 100%;
      width: 377px;
      position: fixed;
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
      position: fixed;
      right: 0;
      top: 0;
      z-index: -1;
    }
  }
`;

const defaultValues = {
  title: "Villa Pinedo",
  description:
    "Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen.",
};

export default function PageWrapper({
  title = defaultValues.title,
  description = defaultValues.description,
  children,
}: Props) {
  return (
    <StyledWrapper>
      <Head>
        <title>{title + " - Voor kinderen met gescheiden ouders"}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#006ef7" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <DynamicHeader />

      <div className="page-content">{children}</div>

      <DynamicFooter />
    </StyledWrapper>
  );
}
