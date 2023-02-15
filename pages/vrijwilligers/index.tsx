import { Container, Grid } from "@mui/material";
import { Header, Hero } from "../../components/layout";

import Button from "../../components/buttons/Button";
import ENDPOINTS from "../../constants/endpoints";
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
        <title>
          Over onze vrijwilligers | Villa Pinedo - Voor kinderen met gescheiden
          ouders
        </title>
        <meta name="description" content={pageData?.page_subtitle} />
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                width: "80%",
                marginTop: 56,
              }}
            >
              <Button onClick={() => alert("Pizza: 🍕")}>Button Primary</Button>
              <Button variant="inverted" onClick={() => alert("Pizza: 🍕")}>
                Button Secondary
              </Button>
            </div>
          </div>
        </Hero>
      </main>
    </div>
  );
};

export default VolunteersPage;
