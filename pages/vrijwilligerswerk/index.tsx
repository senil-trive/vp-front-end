import Button from "../../components/buttons/Button";
import CTAItem from "../../components/content-types/CTAItem/CTAItem";
import { Container } from "@mui/material";
import ContentCarousel from "../../components/carousels/ContentCarousel";
import ENDPOINTS from "../../constants/endpoints";
import FAQList from "../../components/content-types/FAQList/FAQList";
import { H3 } from "../../components/typography";
import { Footer, Hero } from "../../components/layout";
import P from "../../components/typography/P/P";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React, { useState } from "react";
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
interface IVolunteerWeek {
  data: string[];
  id: string;
  title: string;
}
interface IVolunteerWeekState {
  week1: IVolunteerWeek;
  week2: IVolunteerWeek;
  week3: IVolunteerWeek;
  week4: IVolunteerWeek;
  week5: IVolunteerWeek;
}
const VolunteersPage: React.FC<VolunteersPageProps> = ({ pageData }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [volunteerweek, setVolunteerWeek] = useState<IVolunteerWeekState>({
    week1: {
      data: [],
      id: "",
      title: "",
    },
    week2: {
      data: [],
      id: "",
      title: "",
    },
    week3: {
      data: [],
      id: "",
      title: "",
    },
    week4: {
      data: [],
      id: "",
      title: "",
    },
    week5: {
      data: [],
      id: "",
      title: "",
    },
  });

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
          <Hero
            center
            imageUrl={"/vrijwilligerswerkheader.png"}
            style={{
              minHeight: 649,
              position: "relative",
            }}
            mbgn={"/vrijwilligerswerkheadermobile.png"}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                highlightColor="info"
                text={pageData?.page_title}
                textToHighlight={pageData?.page_title_highlighted}
                headerElement="h1"
                color="primary"
              />
              <P color="white">{pageData?.page_subtitle}</P>

              <div className="flex gap-4 mt-14 w-[95%] sm:w-[90%]">
                <Button
                  variant="success"
                  href="/vrijwilligerswerk/aanmelden"
                  className="px-[8px] text-[14px] sm:w-[90%] sm:text-[16px] sm:px-[16px]"
                >
                  {pageData?.signup_button_label}
                </Button>
                <Button
                  variant="infoReversed"
                  href="/vrijwilligerswerk/trainingen"
                  className="px-[8px] text-[14px] sm:w-[90%] sm:text-[16px] sm:px-[16px]"
                >
                  {pageData?.about_button_label}
                </Button>
              </div>
            </div>
          </Hero>

          {pageData?.media_section_1 && (
            <section
              className="my-[40px] md:my-[80px]"
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
            className="my-[40px] md:my-[80px] text-center"
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
              className="my-[80px] md:my-[80px] text-center py-20"
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
              className="my-[80px] md:my-[80px]"
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
            className="my-[80px] md:my-[80px] text-center py-20"
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
            className="my-[40px] md:my-[80px] text-center py-[20px]"
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
            <Container className="my-[40px] md:my-[80px]">
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
          <section>
            <Container>
              <Container>
                <div className="flex flex-col items-center justify-center mb-[20px] md:mb-14">
                  <TitleWithHighlights
                    text={
                      "Na je opleiding aan de slag, zo ziet een week van een vrijwilliger eruit?"
                    }
                    headerElement="h3"
                    color="black"
                  />
                </div>
              </Container>
              <div className="block md:flex justify-between md:pb-[50px] top-block">
                <VoulunteerWeek
                  title={volunteerweek?.week1?.title}
                  data={volunteerweek?.week1?.data}
                  id={volunteerweek?.week1?.id}
                  className="top"
                  name="week1"
                  volunteerweek={volunteerweek}
                  setVolunteerWeek={setVolunteerWeek}
                />
                <VoulunteerWeek
                  title={volunteerweek?.week2?.title}
                  data={volunteerweek?.week2?.data}
                  id={volunteerweek?.week2?.id}
                  className="top"
                  name="week2"
                  volunteerweek={volunteerweek}
                  setVolunteerWeek={setVolunteerWeek}
                />
                <VoulunteerWeek
                  title={volunteerweek?.week3?.title}
                  data={volunteerweek?.week3?.data}
                  id={volunteerweek?.week3?.id}
                  className="top"
                  name="week3"
                  volunteerweek={volunteerweek}
                  setVolunteerWeek={setVolunteerWeek}
                />
              </div>
              <div className="hidden md:flex w-[100%] h-[88px] bg-[#3FC7B4]/[.1] justify-center items-center px-[34px]">
                <div className="w-[100%] px-[50px] text-red h-[2px] bg-[#3FC7B4]"></div>
              </div>

              <div className="block md:flex justify-around md:pt-[50px] bottom-block">
                <VoulunteerWeek
                  title={volunteerweek?.week4?.title}
                  data={volunteerweek?.week4?.data}
                  id={volunteerweek?.week4?.id}
                  className="bottom ml-[100px]"
                  name="week4"
                  volunteerweek={volunteerweek}
                  setVolunteerWeek={setVolunteerWeek}
                />
                <VoulunteerWeek
                  title={volunteerweek?.week5?.title}
                  data={volunteerweek?.week5?.data}
                  id={volunteerweek?.week5?.id}
                  className="bottom mr-[100px]"
                  name="week5"
                  volunteerweek={volunteerweek}
                  setVolunteerWeek={setVolunteerWeek}
                />
              </div>
            </Container>
          </section>
          <FAQList
            containerWidth="lg"
            title={pageData?.faq_section_title}
            items={pageData?.faq_items}
          />

          <Container
            style={{ marginBottom: 80 }}
            className="my-[40px] md:my-[80px]"
          >
            <div className="mt-[20px] flex justify-center md:mt-14">
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
        <Footer />
      </PageWrapper>
    </div>
  );
};

export default VolunteersPage;
