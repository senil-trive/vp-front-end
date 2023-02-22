import React, { ReactNode } from "react";

import Footer from "../Footer/Footer";
import Head from "next/head";
import Header from "../Header/Header";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../Header/Header"), {
  loading: () => <>Loading...</>,
});

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

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
    <div>
      <Head>
        <title>{title} - Voor kinderen met gescheiden ouders</title>
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

      {children}

      <Footer />
    </div>
  );
}
