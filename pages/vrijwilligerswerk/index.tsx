import Button from "../../components/buttons/Button";
import CTAItem from "../../components/content-types/CTAItem/CTAItem";
import { Container } from "@mui/material";
import ContentCarousel from "../../components/carousels/ContentCarousel";
import ENDPOINTS from "../../constants/endpoints";
import FAQList from "../../components/content-types/FAQList/FAQList";
import { H3 } from "../../components/typography";
import { Hero } from "../../components/layout";
import P from "../../components/typography/P/P";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import { Testimonial } from "../../types/content-types/Testimonial.type";
import TextItem from "../../components/content-types/TextItem/TextItem";
import TitleWithHighlights from "../../components/typography/TitleWithHighlights";
import USPItem from "../../components/content-types/USPItem/USPItem";
import VideoItem from "../../components/content-types/VideoItem/VideoItem";
import parseImageURL from "../../utils/parseImageURL";
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import VoulunteerWeek from "../../components/content-types/VolunteerWeek/VolunteerWeek";
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
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <div>
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: pageData?.seo_description
            ? pageData?.seo_description
            : pageData?.page_subtitle,
          canonical: "https://www.villapinedo.nl/vrijwilligerswerk",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                highlightColor="info"
                text={pageData?.page_title}
                textToHighlight={pageData?.page_title_highlighted}
                headerElement="h1"
                color="primary"
              />
              <P>{pageData?.page_subtitle}</P>

              <div className="flex gap-4 mt-14 w-[90%]">
                <Button href="/vrijwilligerswerk/aanmelden">
                  {pageData?.signup_button_label}
                </Button>
                <Button
                  variant="infoReversed"
                  href="/vrijwilligerswerk/trainingen"
                >
                  {pageData?.about_button_label}
                </Button>
              </div>
            </div>
          </Hero>

          {pageData?.media_section_1 && (
            <section
              className="my-[80px]"
              style={{
                backgroundColor: colors.white.transparent,
              }}
            >
              <Container>
                <TextItem
                  rtl={pageData?.media_section_1_rtl}
                  title={pageData?.media_section_1?.title}
                  titleHighlighted={
                    pageData?.media_section_1?.title_highlighted
                  }
                  content={pageData?.media_section_1?.description}
                  imageURL={parseImageURL(pageData?.media_section_1?.image?.id)}
                  imageAlt={pageData?.media_section_1?.image?.title}
                  buttonLabel={pageData?.media_section_1?.button_label}
                  buttonURL={pageData?.media_section_1?.button_url}
                  buttonVariant="primary"
                  showButton={pageData?.media_section_1?.show_button}
                />
              </Container>
            </section>
          )}

          <section
            className="my-[80px] text-center"
            style={{
              backgroundColor: colors.white.transparent,
            }}
          >
            <Container>
              <div className="flex flex-col items-center justify-center ">
                <H3 variant="bold" color="primary">
                  {pageData?.usp_section_title}
                </H3>
                <P className="max-w-4xl">{pageData?.usp_section_description}</P>
              </div>
            </Container>

            <Container>
              <div className="grid md:grid-cols-4 items-start gap-8 mt-14 mx-auto">
                {pageData?.usps?.map((usp: any) => (
                  <USPItem
                    key={usp.id}
                    title={usp.title}
                    description={usp.description}
                    imageAlt={usp.title}
                    imageURL={
                      usp.image?.id && parseImageURL(usp.image?.id, 200)
                    }
                  />
                ))}
              </div>
            </Container>
          </section>

          {pageData?.video_items?.length > 0 && (
            <section
              className="my-[80px] text-center py-20"
              style={{
                backgroundColor: colors.tertiary.light,
              }}
            >
              <Container>
                <div className="flex flex-col items-center justify-center ">
                  <H3 variant="bold" color="primary">
                    {pageData?.video_section_title}
                  </H3>
                  <P className="max-w-4xl">
                    {pageData?.video_section_subtitle}
                  </P>
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
          )}

          {pageData?.media_section_2 && (
            <section
              className="my-[80px]"
              style={{
                backgroundColor: colors.white.transparent,
              }}
            >
              <Container>
                <TextItem
                  rtl={pageData?.media_section_2_rtl}
                  title={pageData?.media_section_2?.title}
                  titleHighlighted={
                    pageData?.media_section_2?.title_highlighted
                  }
                  content={pageData?.media_section_2?.description}
                  imageURL={parseImageURL(pageData?.media_section_2?.image?.id)}
                  imageAlt={pageData?.media_section_2?.image?.title}
                  buttonLabel={pageData?.media_section_2?.button_label}
                  buttonURL={pageData?.media_section_2?.button_url}
                  buttonVariant="info"
                  showButton={pageData?.media_section_2?.show_button}
                />
              </Container>
            </section>
          )}
          <section
            className="my-[80px] text-center py-20"
            style={{
              backgroundColor: colors.tertiary.light,
            }}
          >
            <Container>
              <div className="flex flex-col items-center justify-center ">
                <H3 variant="bold" color="primary">
                  {pageData?.cta_section_title}
                </H3>
                <P className="max-w-4xl">{pageData?.cta_section_subtitle}</P>
              </div>
            </Container>

            <Container>
              <div className="grid md:grid-cols-2 gap-8 mt-14 mx-auto max-w-4xl">
                <CTAItem
                  title={pageData?.cta_section_block_1_title}
                  description={pageData?.cta_section_block_1_subtitle}
                  buttonLabel={pageData?.cta_section_block_1_button_label}
                  buttonURL={pageData?.cta_section_block_1_button_url}
                  buttonVariant="primary"
                />
                <CTAItem
                  title={pageData?.cta_section_block_2_title}
                  description={pageData?.cta_section_block_2_subtitle}
                  buttonLabel={pageData?.cta_section_block_2_button_label}
                  buttonURL={pageData?.cta_section_block_2_button_url}
                  buttonVariant="primary"
                />
              </div>
            </Container>
          </section>
          <section
            className="my-[80px] text-center py-[20px]"
            style={{
              backgroundColor: colors.white.transparent,
            }}
          >
            <Container>
              <div className="flex flex-col items-center justify-center mb-14">
                <TitleWithHighlights
                  text={pageData?.testimonials_section_title}
                  headerElement="h3"
                  color="secondary"
                />

                <P className="max-w-4xl">
                  {pageData?.testimonials_section_subtitle}
                </P>
              </div>
            </Container>

            <Container>
              <ContentCarousel
                slides={pageData?.testimonials?.map(
                  (testimonial: Testimonial) => ({
                    title: testimonial.title,
                    description: testimonial.description,
                    author: testimonial.author,
                    date: testimonial.date,
                  })
                )}
              />
            </Container>
            <Container style={{ marginBottom: 80 }}>
              <div className="flex justify-center mt-14">
                <Button
                  variant="secondary"
                  style={{
                    maxWidth: 200,
                  }}
                  href="/vrijwilligerswerk/aanmelden"
                >
                  Aanmelden
                </Button>
              </div>
            </Container>
          </section>
          <section className="px-[10%]">
            <div className="flex justify-between">
              <VoulunteerWeek
                title="Week1"
                data={[
                  " Kennismaken met collega’s12",
                  " Kennismaken met collega’s12",
                  " Kennismaken met collega’s13",
                  " Kennismaken met collega’s14",
                ]}
              />
              <VoulunteerWeek
                title="Week2"
                data={[
                  " Kennismaken met collega’s21",
                  " Kennismaken met collega’s22",
                  " Kennismaken met collega’s23",
                  " Kennismaken met collega’s24",
                ]}
              />
              <VoulunteerWeek
                title="Week3"
                data={[
                  " Kennismaken met collega’s31",
                  " Kennismaken met collega’s32",
                  " Kennismaken met collega’s33",
                  " Kennismaken met collega’s34",
                ]}
              />
            </div>
            <div className="w-[100%] h-[88px] bg-[#3FC7B4]/[.1]">
              <div className="w-[100%] px-[50px] text-red h-[2px]"></div>
            </div>

            <div className="flex justify-around">
              <VoulunteerWeek
                title="Week4"
                data={[
                  " Kennismaken met collega’s41",
                  " Kennismaken met collega’s42",
                  " Kennismaken met collega’s43",
                  " Kennismaken met collega’s44",
                ]}
              />
              <VoulunteerWeek
                title="Week5"
                data={[
                  " Kennismaken met collega’s1",
                  " Kennismaken met collega’s2",
                  " Kennismaken met collega’s3",
                  " Kennismaken met collega’s4",
                ]}
              />
            </div>
          </section>
          <FAQList
            containerWidth="lg"
            title={pageData?.faq_section_title}
            items={pageData?.faq_items}
          />

          <Container style={{ marginBottom: 80 }}>
            <div className="flex justify-center mt-14">
              <Button
                variant="link"
                style={{ color: colors.info.normal }}
                href="/vrijwilligerswerk/faq"
              >
                Meer lezen
              </Button>
            </div>
          </Container>
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersPage;
