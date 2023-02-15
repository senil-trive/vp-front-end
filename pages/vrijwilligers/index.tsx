import { Header, Hero } from "../../components/layout";

import ENDPOINTS from "../../constants/endpoints";
import { H1 } from "../../components/typography";
import Head from "next/head";
import P from "../../components/typography/P/P";
import React from "react";
import TitleWithHighlights from "../../components/typography/TitleWithHighlights";

type VolunteersPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const req = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_overview_page?fields=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await req.json();

    console.log(res.data);

    return {
      props: {
        pageData: res.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

const VolunteersPage: React.FC<VolunteersPageProps> = ({ pageData }) => {
  console.log(pageData);

  return (
    <div>
      <Head>
        <title>Villa Pinedo - Voor kinderen met gescheiden ouders</title>
        <meta
          name="description"
          content="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Hero>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 720,
            }}
          >
            <TitleWithHighlights
              text={pageData?.page_title}
              textToHighlight={pageData?.page_title_highlighted}
              headerElement="h1"
            />
            <P>{pageData?.page_subtitle}</P>
          </div>
        </Hero>
      </main>
    </div>
  );
};

export default VolunteersPage;
