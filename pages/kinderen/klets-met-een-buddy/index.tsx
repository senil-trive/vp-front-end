import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { H3, P, TitleWithHighlights } from "../../../components/typography";

import Button from "../../../components/buttons/Button";
import CTAItem from "../../../components/content-types/CTAItem/CTAItem";
import { Container } from "@mui/material";
import ContentCarousel from "../../../components/carousels/ContentCarousel";
import ENDPOINTS from "../../../constants/endpoints";
import FAQList from "../../../components/content-types/FAQList/FAQList";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { TEMP_QUOTES } from "../../../constants/mockData";
import TextItem from "../../../components/content-types/TextItem/TextItem";
import parseImageURL from "../../../utils/parseImageURL";
import { useTheme } from "styled-components";
import {
  BuddymediaWrapper,
  ReflectiveCardWrapper,
} from "../../../styles/kinderen/kletsmeet.styles";
import InfoCard from "../../../components/content-types/InfoCard/InfoCard";
import VideoItem from "../../../components/content-types/VideoItem/VideoItem";
import { VideoWrapper } from "../../../styles/Vrjwilligerswerk/VrijwilligerWorden.styles";
import CommonDetailCard from "../../../components/content-types/CommonDetailCard/CommonDetailCard";

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
        pageData: pageRes.data || null,
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

const KletsMeetBuddyPage: React.FC<BuddyPageProps> = ({ pageData }) => {
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
          canonical: "https://www.villapinedo.nl/kinderen/ik-wil-een-buddy/",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero
            center
            imageUrl={"/kletsmeethead.png"}
            style={{
              minHeight: 576,
              position: "relative",
            }}
          >
            <div>
              <div className="text-left max-w-2xl mt-[-80px] md:mt-[0px] md:text-center">
                <TitleWithHighlights
                  text={"Het online - buddyprogramma"}
                  className="text-[#fff]"
                />
                <P>{pageData?.page_subtitle}</P>
              </div>
              <div className="hidden md:flex">
                <Button
                  variant="success"
                  className="mr-[31px] mb-[10px] bg-[transparent] text-[#fff] border-[#fff] hover:bg-[#fff] hover:text-[#3FC7B4]"
                >
                  ik wil een buddy
                </Button>
                <Button
                  variant="success"
                  className="bg-[transparent] text-[#fff] border-[#fff] hover:bg-[#fff] hover:text-[#3FC7B4]"
                >
                  zelf buddy worden
                </Button>
              </div>
            </div>
          </Hero>

          <BuddymediaWrapper>
            <Container>
              <div className="block relative mt-[-190px] md:flex gap-10 md:mt-[-80px]">
                <InfoCard
                  variant="blog"
                  imageUrl="/buddymedia.png"
                  title="Wat is een buddy precies? "
                  description="Als je ouders bijna uit elkaar gaan, net uit elkaar zijn of al een tijdje gescheiden zijn, heb je misschien behoefte om hierover te praten. Bij Villa Pinedo kan dat. Wij koppelen je aan een Buddy voor een luisterend oor."
                  icon="/handsake.svg"
                  category="Thema"
                  className=" hover:bg-[#FE517E] text-[#fff] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[#FE517E] border-[#fff]"
                      // href="/vrijwilligerswerk/aanmelden"
                    >
                      bekijken
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="primary"
                  imageUrl="/buddyappmedia.png"
                  title="wat is de buddy app?"
                  description="Een Buddy luistert naar wat je te vertellen hebt. Een Buddy oordeelt niet, dus je kunt alles zeggen wat je wilt. Je mag altijd appen. Een Buddy heeft zelf ook gescheiden ouders en kan je helpen met lastige vragen."
                  category="Thema"
                  icon="/buddyappicon.png"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[#006EF7] border-[#fff]"
                      // href="/vrijwilligerswerk/aanmelden"
                    >
                      bekijken
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </BuddymediaWrapper>
          <ReflectiveCardWrapper className="mt-[40px] md:mt-[80px]">
            <Container>
              <div className="flex flex-col md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={"ben je al vrijwilliger en zoek je verdieping?"}
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
              <div className="container-reflect flex flex-wrap">
                <CommonDetailCard
                  leftIcon="/icon1reflect.svg"
                  title={"jou helpen met lastige vragen te beantwoorden"}
                  description={
                    "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  }
                  variant="info"
                />
                <CommonDetailCard
                  leftIcon="/icon2reflect.svg"
                  title={"zich in jou situatie verplaatsen / adviseren"}
                  description={
                    "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  }
                  variant="info"
                />
                <CommonDetailCard
                  leftIcon="/icon3reflect.svg"
                  title={"luisteren zodat jij je hart kunt luchten"}
                  description={
                    "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                  }
                  variant="info"
                />
              </div>
            </Container>
          </ReflectiveCardWrapper>
          <VideoWrapper className="my-[40px] md:my-[80px]">
            <Container>
              <div className="flex flex-col md:items-center md:justify-center mb-6 md:mb-14">
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
            // containerWidth="lg"
            title={pageData?.faq_section_title}
            items={pageData?.faq_items}
          />

          <Container
            style={{ marginBottom: 80 }}
            className="my-[40px] md:my-[80px]"
          >
            <div className="mt-[20px] flex justify-center mb-6 md:mt-14">
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

export default KletsMeetBuddyPage;
