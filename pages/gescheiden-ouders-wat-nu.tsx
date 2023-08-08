import { P, TitleWithHighlights } from "../components/typography";
import Button from "../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../constants/endpoints";
import FAQList from "../components/content-types/FAQList/FAQList";
import { Hero } from "../components/layout";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import parseImageURL from "../utils/parseImageURL";
import { useTheme } from "styled-components";
import {
  BuddymediaWrapper,
  ReflectiveCardWrapper,
} from "../styles/kinderen/kletsmeet.styles";
import InfoCard from "../components/content-types/InfoCard/InfoCard";
import VideoItem from "../components/content-types/VideoItem/VideoItem";
import { VideoWrapper } from "../styles/Vrjwilligerswerk/VrijwilligerWorden.styles";
import { ContainerWrapper } from "../styles/Vrjwilligerswerk/index.styles";
import { parseFileURL } from "../utils/parseFileURL";
import CommonDetailCard from "../components/content-types/CommonDetailCard/CommonDetailCard";
type BuddyPageProps = {
  pageDat: any;
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/buddy_page?fields=*.*.*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pageRqe = await fetch(
      `${ENDPOINTS.COLLECTIONS}/divorced_parents_now_what?fields=*.*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pageRse = await pageRqe.json();
    const pageRes = await pageReq.json();
    return {
      props: {
        pageData: pageRes.data || null,
        pageDat: pageRse.data || null,
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

const GescheidenOudersWatNu: React.FC<BuddyPageProps> = ({
  pageData,
  pageDat,
}) => {
  const { colors } = useTheme();
  return (
    <ContainerWrapper className="klets-meet">
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: pageData?.seo_description
            ? pageData?.seo_description
            : pageData?.page_subtitle,
          canonical: "https://www.villapinedo.nl/ik-wil-een-buddy/",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero
            center
            imageUrl={parseImageURL(pageData?.header_background_image?.id)}
            style={{
              minHeight: 576,
              position: "relative",
            }}
            mobileImageHeight={572}
          >
            <div>
              <div className="text-left max-w-2xl md:max-w-4xl mt-[-80px] md:mt-[-120px] md:text-center">
                <TitleWithHighlights
                  text={"gescheiden ouders, wat nu?!"}
                  style={{ marginBottom: "0px" }}
                  className="text-[#fff] text-[46px] font-[400] md:text-[64px]"
                />
                <P
                  style={{ marginBottom: "18px" }}
                  className="text-[#fff] text-[20px] leading-[160%] md:text-[18px]"
                >
                  Scheiding van je ouders overleefd? Dan ben je ondertussen een
                  ervaringsdeskundige. Kinderen die nu in dezelfde situatie
                  zitten als waar jij in gezeten hebt, vinden het fijn om tips
                  en adviezen te krijgen van jou. Of gewoon even hun hart te
                  luchten. Meld je daarom aan als vrijwilliger.
                </P>
              </div>
            </div>
          </Hero>

          <BuddymediaWrapper>
            <Container>
              <div className="block relative mt-[-190px] md:flex gap-10 md:mt-[-80px]">
                {pageData?.media_items?.map((item: any, index: number) => {
                  return (
                    <>
                      {index === 0 && (
                        <InfoCard
                          variant="blog"
                          imageUrl={parseImageURL(item?.image?.id)}
                          title={item.title}
                          description={item.description}
                          icon={parseImageURL(pageData?.note_write_icon?.id)}
                          category={"Thema"}
                          className="small-fonts bg-[#FE517E] text-[#fff] h-[100%] flex flex-col mb-[40px] md:mb-[0]"
                        >
                          <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                            <Button
                              style={{ fontFamily: "Fjalla One" }}
                              variant="secondary"
                              className="w-[100%] text-[16px] font-[400] bg-[#fff] text-[#FE517E] border-[#fff] hover:bg-[#FE517E] md:text-[18px]"
                              href={`/open-brieven/${pageData?.highlighted_letter?.slug}`}
                            >
                              Meer lezen
                            </Button>
                          </div>
                        </InfoCard>
                      )}
                      {index === 1 && (
                        <InfoCard
                          variant="primary"
                          imageUrl={parseImageURL(item?.image?.id)}
                          title={item.title}
                          description={item?.description}
                          category="Thema"
                          icon={parseImageURL(item?.title_right_icon?.id)}
                          className="small-fonts mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                        >
                          <div className="flex justify-center mt-[20px] md:mt-[auto]">
                            <Button
                              variant="secondary"
                              className="w-[100%] text-[18px] font-[400] bg-[#fff] text-[#006EF7] border-[#fff]"
                              href={item.button_url}
                            >
                              {item?.button_label}
                            </Button>
                          </div>
                        </InfoCard>
                      )}
                    </>
                  );
                })}
              </div>
            </Container>
          </BuddymediaWrapper>
          <ReflectiveCardWrapper className="mt-[40px] md:mt-[141px]">
            <Container>
              <div className="flex flex-col md:text-center md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.buddy_help_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] md:text-[42px] font-[400]"
                />
                <P className="max-w-7xl text-[16px] md:text-[18px]">
                  {pageData?.buddy_help_section_subtitle}
                </P>
              </div>
            </Container>
            <Container>
              <div className="container-reflect flex flex-wrap">
                {pageDat?.info_blocks?.map((ite: any) => (
                  <CommonDetailCard
                    key={ite.info_title}
                    title={ite.info_title}
                    description={ite?.info_subtitle}
                    variant="info"
                    button={ite.info_button_title}
                    buttonLink={ite.info_button_url}
                    className="divorced-parents"
                  />
                ))}
              </div>
            </Container>
          </ReflectiveCardWrapper>
          <VideoWrapper className="my-[136px]">
            <Container>
              <div className="flex flex-col md:items-center md:justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.stories_section_title}
                  headerElement="h3"
                  color="black"
                  className="text-[30px] max-w-3xl md:text-center md:text-[42px] font-[400]"
                />

                <P className="max-w-5xl text-[16px] md:text-[18px] md:text-center">
                  {pageData?.stories_section_subtitle}
                </P>
              </div>
            </Container>
            <Container>
              <div className="video-container flex flex-wrap">
                {pageData?.featured_stories?.map((feature_stories: any) => (
                  <VideoItem
                    key={feature_stories?.title}
                    title={feature_stories?.title}
                    poster={parseImageURL(
                      feature_stories?.video_cover_image?.id
                    )}
                    src={parseFileURL(feature_stories?.video_file?.id)}
                    subtitle={feature_stories.subtitle}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
            </Container>
          </VideoWrapper>
          <section className="mb-[80px] mt-[-40px] md:mt-[0px]">
            <FAQList
              title={pageData?.faq_section_title}
              items={pageData?.featured_faqs.slice(0, 3)}
              show={true}
            />
            <Container
              style={{ marginBottom: 145, marginTop: -24 }}
              className="mt-2 hidden sm:block"
            >
              <div className="mt-[20px] flex justify-center mb-6 md:mt-14 ">
                <Button
                  variant="link"
                  style={{
                    color: colors.info.normal,
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                  href="/faqs/volunteer_faq"
                  className="w-[100%] bg-[#3FC7B4] text-[#fff] no-underline hover:underline"
                >
                  {pageData?.more_faq_button_title}
                </Button>
              </div>
            </Container>
          </section>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default GescheidenOudersWatNu;
