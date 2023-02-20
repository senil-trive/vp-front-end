import { H1, H3, P } from "../../components/typography";
import { Header, Hero } from "../../components/layout";

import Button from "../../components/buttons/Button";
import CTAItem from "../../components/content-types/CTAItem/CTAItem";
import { Container } from "@mui/material";
import ENDPOINTS from "../../constants/endpoints";
import { FAQ } from "../../types/content-types/FAQ.type";
import FAQItem from "../../components/content-types/FAQItem/FAQItem";
import Head from "next/head";
import TextItem from "../../components/content-types/TextItem/TextItem";
import VideoItem from "../../components/content-types/VideoItem/VideoItem";
import parseImageURL from "../../utils/parseImageURL";

type BuddyPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/buddy_page?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();

    return {
      props: {
        pageData: pageRes.data,
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

const BuddyPage: React.FC<BuddyPageProps> = ({ pageData }) => {
  return (
    <div>
      <Head>
        <title>
          {pageData?.page_title} | Villa Pinedo - Voor kinderen met gescheiden
          ouders
        </title>
        <meta name="description" content={pageData?.page_subtitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Hero>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
            <H1 variant="bold">{pageData?.page_title}</H1>
            <P>{pageData?.page_subtitle}</P>
            <div className="flex gap-4 mt-14 w-[80%]">
              <Button onClick={() => alert("Pizza: 🍕")}>
                {pageData?.header_button_1_label}
              </Button>
              <Button variant="info" onClick={() => alert("Pizza: 🍕")}>
                {pageData?.header_button_2_label}
              </Button>
            </div>
          </div>
        </Hero>

        {pageData?.media_items?.map((item: any, index: number) => (
          <section className="my-[200px]" key={item?.id}>
            <Container>
              <TextItem
                rtl={index % 2 !== 0}
                title={item?.title}
                titleHighlighted={item?.title_highlighted}
                content={item?.description}
                imageURL={parseImageURL(item?.image?.id)}
                imageAlt={item?.image?.title}
                buttonLabel={item?.button_label}
                buttonURL={item?.button_url}
                buttonVariant="primary"
              />
            </Container>
          </section>
        ))}

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

          <Container maxWidth="xl">
            <div className="grid md:grid-cols-3 gap-8 mt-14 mx-auto">
              <CTAItem
                title={pageData?.cta_block_1_title}
                description={pageData?.cta_block_1_description}
                imageURL={parseImageURL(pageData?.cta_block_1_image?.id)}
                imageAlt={pageData?.cta_block_1_title}
              />
              <CTAItem
                title={pageData?.cta_block_2_title}
                description={pageData?.cta_block_2_description}
                imageURL={parseImageURL(pageData?.cta_block_2_image?.id)}
                imageAlt={pageData?.cta_block_2_title}
              />
              <CTAItem
                title={pageData?.cta_block_3_title}
                description={pageData?.cta_block_3_description}
                imageURL={parseImageURL(pageData?.cta_block_3_image?.id)}
                imageAlt={pageData?.cta_block_3_title}
              />
            </div>
          </Container>
        </section>

        <section className="my-[200px] text-center py-20">
          <Container>
            <div className="flex flex-col items-center justify-center ">
              <H3 variant="bold" color="blue">
                {pageData?.stories_section_title}
              </H3>
              <P className="max-w-4xl">{pageData?.stories_section_subtitle}</P>
            </div>
          </Container>

          <Container>
            <div className="grid md:grid-cols-3 gap-8 mt-14 mx-auto">
              {pageData?.featured_stories?.map((video: any) => (
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

        <section className="my-[200px] text-center py-20">
          <Container>
            <div className="flex flex-col items-center justify-center mb-14">
              <H3 variant="bold" color="black">
                {pageData?.faq_section_title}
              </H3>
            </div>
          </Container>

          <Container maxWidth="xl">
            <div className="flex flex-col gap-8">
              {pageData?.featured_faqs?.map((faq: FAQ) => (
                <FAQItem
                  key={faq.id}
                  title={faq.title}
                  description={faq.description}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default BuddyPage;
