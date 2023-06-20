import Button from "../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../constants/endpoints";
import FAQList from "../../components/content-types/FAQList/FAQList";
import { Hero } from "../../components/layout";
import P from "../../components/typography/P/P";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React, { useState } from "react";
import TitleWithHighlights from "../../components/typography/TitleWithHighlights";
import VideoItem from "../../components/content-types/VideoItem/VideoItem";
import parseImageURL from "../../utils/parseImageURL";
import { useTheme } from "styled-components";
import VoulunteerWeek from "../../components/content-types/VolunteerWeek/VolunteerWeek";
import InfoCard from "../../components/content-types/InfoCard/InfoCard";
import CommonDetailCard from "../../components/content-types/CommonDetailCard/CommonDetailCard";
import {
  PeopleWrapper,
  VideoWrapper,
} from "../../styles/Vrjwilligerswerk/VrijwilligerWorden.styles";
import { ContainerWrapper } from "../../styles/Vrjwilligerswerk/index.styles";
import { HeroBannerWrapper } from "../../styles/global.styled";
type VolunteersPageProps = {
  pageData: any;
  volunteerweekwork: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const req = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_overview_page?fields=faq_items.*,video_items.*,usps.*,*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const volunteerweekreq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_week_work`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await req.json();
    const volunteerweekres = await volunteerweekreq.json();
    return {
      props: {
        pageData: res.data || null,
        volunteerweekwork: volunteerweekres?.data || null,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

const VolunteersPage: React.FC<VolunteersPageProps> = ({
  pageData,
  volunteerweekwork,
}) => {
  const { colors } = useTheme();
  const [volunteerweek, setVolunteerWeek] = useState(volunteerweekwork);
  return (
    <ContainerWrapper className="volunteer">
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
            mobileImageHeight={740}
          >
            <HeroBannerWrapper>
              <div className="title-wrap max-w-2xl md:max-w-5xl">
                <TitleWithHighlights
                  highlightColor="info"
                  text={pageData?.page_title}
                  headerElement="h1"
                  color="white"
                  className="title"
                />
                <P color="white" className="subtitle">
                  {pageData?.page_subtitle}
                </P>

                <div className="hidden gap-4 mt-14 w-[69%] md:flex md:mx-auto">
                  <Button
                    variant="success"
                    href="/vrijwilligerswerk/aanmelden"
                    className="px-[5px]  bg-[transparent] border-[#fff] text-[#fff] hover:bg-[#06D6A0] hover:border-none text-[18px] font-[400]"
                  >
                    {pageData?.signup_button_label}
                  </Button>
                  <Button
                    variant="infoReversed"
                    href="/vrijwilligerswerk/trainingen"
                    className="px-[5px] text-[18px] font-[400] bg-[transparent] border-[#fff] text-[#fff] hover:bg-[#06D6A0] hover:border-none"
                  >
                    {pageData?.about_button_label}
                  </Button>
                </div>
              </div>
            </HeroBannerWrapper>
          </Hero>

          <section className="mb-[40px] md:mb-[80px]">
            <Container>
              <div className="block relative mt-[-120px] md:mt-[-80px] md:flex gap-10">
                <InfoCard
                  variant="blog"
                  title={pageData?.cta_section_block_1_title}
                  description={pageData?.cta_section_block_1_subtitle}
                  icon="/handsake.svg"
                  className=" hover:bg-[#FE517E] text-[#fff] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[18px] font-[400] text-[#FE517E] border-[#fff] mt-[20px]"
                      href={pageData?.cta_section_block_1_button_url}
                    >
                      {pageData?.cta_section_block_1_button_label}
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="primary"
                  title={pageData?.cta_section_block_2_title}
                  description={pageData?.cta_section_block_2_subtitle}
                  icon="/note.svg"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[18px] font-[400] text-[#006EF7] border-[#fff]"
                      href={pageData?.cta_section_block_2_button_url}
                    >
                      {pageData?.cta_section_block_2_button_label}
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </section>

          <PeopleWrapper>
            <Container>
              <div className="flex flex-col md:text-center md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.usp_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] md:text-[42px] font-[400]"
                />
                <P className="max-w-4xl text-[300]">
                  {pageData?.usp_section_description}
                </P>
              </div>
            </Container>
            <Container>
              <div className="people-container flex flex-wrap">
                {pageData?.usps?.map((usp: any, index: number) => (
                  <CommonDetailCard
                    key={usp.title}
                    title={usp?.title}
                    description={usp?.description}
                    imageUrl={
                      index === 0
                        ? "/diffpeople1.png"
                        : index === 1
                        ? "/diffpeople2.png"
                        : index === 2
                        ? "/diffpeople3.png"
                        : "/diffpeople4.png"
                    }
                    variant="info"
                  />
                ))}
              </div>
            </Container>
          </PeopleWrapper>
          <section>
            <Container>
              <Container className="pl-[0] md:pl-[24px]">
                <div className="flex flex-col md:items-center md:justify-center mb-[20px] md:mb-14">
                  <TitleWithHighlights
                    text={pageData?.volunteer_week_title}
                    headerElement="h3"
                    color="black"
                    className="text-[30px] md:text-[42px] font-[400]"
                  />
                </div>
              </Container>
              {globalThis.innerWidth < 768 ? (
                <div className="block md:hidden">
                  {volunteerweek?.map(
                    (volunteers: any, index: number) =>
                      index < 5 && (
                        <VoulunteerWeek
                          key={volunteers.id}
                          title={volunteers.title}
                          data={volunteers.description_list}
                          id={volunteers.id}
                          name={`week${index + 1}`}
                          volunteerweek={volunteerweek}
                          setVolunteerWeek={setVolunteerWeek}
                        />
                      )
                  )}
                </div>
              ) : (
                <>
                  <div className="hidden md:flex justify-between md:pb-[50px] top-block">
                    <VoulunteerWeek
                      title={volunteerweek?.[0].title}
                      data={volunteerweek?.[0].description_list}
                      id={volunteerweek?.[0].id}
                      className="top"
                      name="week1"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                    <VoulunteerWeek
                      title={volunteerweek?.[2].title}
                      data={volunteerweek?.[2].description_list}
                      id={volunteerweek?.[2].id}
                      className="top"
                      name="week2"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                    <VoulunteerWeek
                      title={volunteerweek?.[4].title}
                      data={volunteerweek?.[4].description_list}
                      id={volunteerweek?.[4].id}
                      className="top"
                      name="week2"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                  </div>
                  <div className="hidden md:flex w-[100%] h-[88px] bg-[#3FC7B4]/[.1] justify-center items-center px-[34px]">
                    <div className="w-[100%] px-[50px] text-red h-[2px] bg-[#3FC7B4]"></div>
                  </div>

                  <div className="hidden md:flex justify-around md:pt-[50px] bottom-block">
                    <VoulunteerWeek
                      title={volunteerweek?.[1]?.title}
                      data={volunteerweek?.[1]?.description_list}
                      id={volunteerweek?.[1]?.id}
                      className="bottom ml-[100px]"
                      name="week4"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                    <VoulunteerWeek
                      title={volunteerweek?.[3].title}
                      data={volunteerweek?.[3].description_list}
                      id={volunteerweek?.[3].id}
                      className="bottom mr-[100px]"
                      name="week5"
                      volunteerweek={volunteerweek}
                      setVolunteerWeek={setVolunteerWeek}
                    />
                  </div>
                </>
              )}
            </Container>
          </section>
          <VideoWrapper className="my-[40px] md:my-[80px]">
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.video_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] m:text-[42px] font-[400]"
                />

                <P className="max-w-4xl font-[300]">
                  {pageData?.video_section_subtitle}
                </P>
              </div>
            </Container>
            <Container>
              <div className="video-container flex flex-wrap">
                {pageData?.video_items?.map(
                  (storyvideo: any, index: number) => (
                    <VideoItem
                      key={storyvideo?.title}
                      title={storyvideo?.title}
                      poster={
                        index === 0
                          ? "/storyposter1.png"
                          : index === 1
                          ? "/storyposter2.png"
                          : "/storyposter3.png"
                      }
                      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      subtitle={storyvideo?.subtitle}
                    />
                  )
                )}
              </div>
            </Container>
          </VideoWrapper>
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
                className="w-[100%] text-[18px] font-[400] bg-[#3FC7B4] text-[#fff] no-underline hover:underline"
              >
                Meer lezen
              </Button>
            </div>
          </Container>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default VolunteersPage;
