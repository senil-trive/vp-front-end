import { Container, Grid } from "@mui/material";
import { H2, H3 } from "../../components/typography";
import { Header, Hero } from "../../components/layout";

import Button from "../../components/buttons/Button";
import CTAItem from "../../components/content-types/CTAItem/CTAItem";
import ENDPOINTS from "../../constants/endpoints";
import Head from "next/head";
import P from "../../components/typography/P/P";
import React from "react";
import TextItem from "../../components/content-types/TextItem/TextItem";
import TitleWithHighlights from "../../components/typography/TitleWithHighlights";
import USPItem from "../../components/content-types/USPItem/USPItem";
import VideoItem from "../../components/content-types/VideoItem/VideoItem";
import parseImageURL from "../../utils/parseImageURL";

type VolunteersPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const req = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_overview_page?fields=*.*.*`,
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
          <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
            <TitleWithHighlights
              text={pageData?.page_title}
              textToHighlight={pageData?.page_title_highlighted}
              headerElement="h1"
              color="blue"
            />
            <P>{pageData?.page_subtitle}</P>

            <div className="flex gap-4 mt-14 w-[80%]">
              <Button onClick={() => alert("Pizza: 🍕")}>
                {pageData?.signup_button_label}
              </Button>
              <Button variant="infoReversed" onClick={() => alert("Pizza: 🍕")}>
                {pageData?.about_button_label}
              </Button>
            </div>
          </div>
        </Hero>

        {pageData?.media_section_1 && (
          <section className="my-[200px]">
            <Container>
              <TextItem
                rtl={pageData?.media_section_1_rtl}
                title={pageData?.media_section_1?.title}
                titleHighlighted={pageData?.media_section_1?.title_highlighted}
                content={pageData?.media_section_1?.description}
                imageURL={parseImageURL(pageData?.media_section_1?.image?.id)}
                imageAlt={pageData?.media_section_1?.image?.title}
                buttonLabel={pageData?.media_section_1?.button_label}
                buttonURL={pageData?.media_section_1?.button_url}
                buttonVariant="primary"
              />
            </Container>
          </section>
        )}

        <section className="my-[200px] text-center">
          <Container>
            <div className="flex flex-col items-center justify-center ">
              <H3 variant="bold" color="blue">
                {pageData?.usp_section_title}
              </H3>
              <P className="max-w-4xl">{pageData?.usp_section_description}</P>
            </div>
          </Container>

          <Container>
            <div className="grid md:grid-cols-4 gap-8 mt-14 mx-auto">
              {pageData?.usps?.map((usp: any) => (
                <USPItem
                  key={usp.id}
                  title={usp.title}
                  description={usp.description}
                  imageAlt={usp.title}
                  imageURL={parseImageURL(usp.image?.id)}
                />
              ))}
            </div>
          </Container>
        </section>
        <section
          className="my-[200px] text-center py-20"
          style={{
            backgroundColor: "rgba(0, 110, 247, 0.05)",
          }}
        >
          <Container>
            <div className="flex flex-col items-center justify-center ">
              <H3 variant="bold" color="blue">
                {pageData?.video_section_title}
              </H3>
              <P className="max-w-4xl">{pageData?.video_section_subtitle}</P>
            </div>
          </Container>

          <Container>
            <div className="grid md:grid-cols-3 gap-8 mt-14 mx-auto">
              {pageData?.video_items?.map((video: any) => (
                <VideoItem
                  title={video.title}
                  subtitle={video.subtitle}
                  src={video.video_file?.url}
                  key={video.id}
                  poster={parseImageURL(video.video_cover_image?.id)}
                />
              ))}
            </div>
          </Container>
        </section>
        {pageData?.media_section_2 && (
          <section className="my-[200px]">
            <Container>
              <TextItem
                rtl={pageData?.media_section_2_rtl}
                title={pageData?.media_section_2?.title}
                titleHighlighted={pageData?.media_section_2?.title_highlighted}
                content={pageData?.media_section_2?.description}
                imageURL={parseImageURL(pageData?.media_section_2?.image?.id)}
                imageAlt={pageData?.media_section_2?.image?.title}
                buttonLabel={pageData?.media_section_2?.button_label}
                buttonURL={pageData?.media_section_2?.button_url}
                buttonVariant="info"
              />
            </Container>
          </section>
        )}
        <section
          className="my-[200px] text-center py-20"
          style={{
            backgroundColor: "rgba(0, 110, 247, 0.05)",
          }}
        >
          <Container>
            <div className="flex flex-col items-center justify-center ">
              <H3 variant="bold" color="blue">
                {pageData?.cta_section_title}
              </H3>
              <P className="max-w-4xl">{pageData?.cta_section_subtitle}</P>
            </div>
          </Container>

          <Container>
            <div className="grid md:grid-cols-2 gap-8 mt-14 mx-auto">
              <CTAItem
                title={pageData?.cta_section_block_1_title}
                description={pageData?.cta_section_block_1_subtitle}
                imageURL={parseImageURL(
                  pageData?.cta_section_block_1_image?.id
                )}
                imageAlt={pageData?.cta_section_block_1_title}
                buttonLabel={pageData?.cta_section_block_1_button_label}
                buttonURL={pageData?.cta_section_block_1_button_url}
                buttonVariant="primary"
              />
              <CTAItem
                title={pageData?.cta_section_block_2_title}
                description={pageData?.cta_section_block_2_subtitle}
                imageURL={parseImageURL(
                  pageData?.cta_section_block_2_image?.id
                )}
                imageAlt={pageData?.cta_section_block_2_title}
                buttonLabel={pageData?.cta_section_block_2_button_label}
                buttonURL={pageData?.cta_section_block_2_button_url}
                buttonVariant="primary"
              />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default VolunteersPage;
