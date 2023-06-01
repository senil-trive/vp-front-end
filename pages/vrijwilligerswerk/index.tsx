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
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import VoulunteerWeek from "../../components/content-types/VolunteerWeek/VolunteerWeek";
import InfoCard from "../../components/content-types/InfoCard/InfoCard";
import CommonDetailCard from "../../components/content-types/CommonDetailCard/CommonDetailCard";
import {
  PeopleWrapper,
  VideoWrapper,
} from "../../styles/Vrjwilligerswerk/VrijwilligerWorden.styles";
type VolunteersPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const req = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_overview_page`,
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
            <div className="flex flex-col md:items-center md:justify-center md:text-center max-w-2xl my-16">
              <TitleWithHighlights
                highlightColor="info"
                text={pageData?.page_title}
                textToHighlight={pageData?.page_title_highlighted}
                headerElement="h1"
                color="primary"
              />
              <P color="white">{pageData?.page_subtitle}</P>

              <div className="hidden gap-4 mt-14 w-[95%] sm:w-[90%] md:flex">
                <Button
                  variant="success"
                  href="/vrijwilligerswerk/aanmelden"
                  className="px-[8px] bg-[transparent] text-[#06D6A0] hover:bg-[#06D6A0] hover:text-[#fff] text-[14px] sm:w-[90%] sm:text-[16px] sm:px-[16px]"
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

          <section className="mb-[40px] md:mb-[80px]">
            <Container>
              <div className="block relative mt-[-120px] md:mt-[-80px] md:flex gap-10">
                <InfoCard
                  variant="blog"
                  title="Onze ideale vrijwilliger"
                  description="is iemand die er zonder oordeel wil zijn voor een kind. Wil jij, tussen alle dingen die jouw agenda vullen door, tijd maken om te chatten met een kind? Geef een kind het gevoel er niet alleen voor te staan."
                  icon="/handsake.svg"
                  className=" hover:bg-[#FE517E] text-[#fff] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[#FE517E] border-[#fff]"
                      // href="/vrijwilligerswerk/aanmelden"
                    >
                      Aanmelden
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="primary"
                  title="volg onze trainingen"
                  description="Villa Pinedo is trots en dankbaar voor de jongeren die zich inzetten voor andere kinderen met gescheiden ouders. Daarom investeren wij graag in jou door je meerdere trainingen, masterclasses en inspiratiesessies aan te bieden."
                  icon="/note.svg"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[#006EF7] border-[#fff]"
                      // href="/vrijwilligerswerk/aanmelden"
                    >
                      Aanmelden
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </section>

          <PeopleWrapper>
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={
                    "Als vrijwilliger maak jij het verschil bij de jongeren!"
                  }
                  headerElement="h3"
                  color="black"
                />
                <P className="max-w-4xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </P>
              </div>
            </Container>
            <Container>
              <div className="people-container flex flex-wrap">
                <CommonDetailCard
                  title="Een luisterend oor"
                  description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  imageUrl="/diffpeople1.png"
                  variant="info"
                />
                <CommonDetailCard
                  title="Een luisterend oor"
                  description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  imageUrl="/diffpeople2.png"
                  variant="info"
                />
                <CommonDetailCard
                  title="Een luisterend oor"
                  description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  imageUrl="/diffpeople3.png"
                  variant="info"
                />
                <CommonDetailCard
                  title="Een luisterend oor"
                  description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  imageUrl="/diffpeople4.png"
                  variant="info"
                />
              </div>
            </Container>
          </PeopleWrapper>
          <section>
            <Container>
              <Container className="pl-[0] md:pl-[24px]">
                <div className="flex flex-col md:items-center md:justify-center mb-[20px] md:mb-14">
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
          <VideoWrapper className="my-[40px] md:my-[80px]">
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={
                    "Zij gingen jou voor, luister hieronder naar hun verhaal"
                  }
                  headerElement="h3"
                  color="black"
                />

                <P className="max-w-4xl">
                  Deze brief is speciaal voor jou: voor kinderen waarvan de
                  ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen
                  per jaar horen dat hun ouders gaan scheiden? Dat is superveel,
                  bijna twee voetbalstadions vol.
                </P>
              </div>
            </Container>
            <Container>
              <div className="video-container flex flex-wrap">
                <VideoItem
                  title="Wat leer je bij de trainingen?"
                  poster="/storyposter1.png"
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  subtitle="Hier komt een omschrijvende tekst"
                />
                <VideoItem
                  title="Wat leer je bij de trainingen?"
                  poster="/storyposter2.png"
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  subtitle="Hier komt een omschrijvende tekst"
                />
                <VideoItem
                  title="Wat leer je bij de trainingen?"
                  poster="/storyposter3.png"
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  subtitle="Hier komt een omschrijvende tekst"
                />
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
                className="w-[100%] bg-[#3FC7B4] text-[#fff] no-underline hover:underline"
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
