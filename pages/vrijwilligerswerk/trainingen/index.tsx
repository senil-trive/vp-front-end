import { H3, P, TitleWithHighlights } from "../../../components/typography";

import Button from "../../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import parseImageURL from "../../../utils/parseImageURL";
import {
  PackageWrapper,
  TrainigenHeroWrapper,
  TrainigenIdealWrapper,
} from "../../../styles/Vrjwilligerswerk/TrainigenWrapper.styles";
import InfoCard from "../../../components/content-types/InfoCard/InfoCard";
import { ContainerWrapper } from "../../../styles/Vrjwilligerswerk/index.styles";
import { HeroBannerWrapper } from "../../../styles/global.styled";

type VolunteersTrainingPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_training_overview_page?fields=*.*.*`,
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
        pageData: pageRes?.data || null,
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

const VolunteersTrainingPage: React.FC<VolunteersTrainingPageProps> = ({
  pageData,
}) => {
  return (
    <ContainerWrapper className="volunteer-training">
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: pageData?.seo_description
            ? pageData?.seo_description
            : pageData?.page_subtitle,
          canonical: "https://www.villapinedo.nl/vrijwilligerswerk/trainingen",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <TrainigenHeroWrapper>
            <Hero
              center
              imageUrl={parseImageURL(pageData?.hero_image?.id)}
              style={{
                minHeight: 555,
                position: "relative",
              }}
              mobileImageHeight={932}
            >
              <HeroBannerWrapper className="training">
                <div className="title-wrap max-w-4xl">
                  <TitleWithHighlights
                    highlightColor="info"
                    text={pageData?.page_title}
                    headerElement="h1"
                    color="white"
                    className="title"
                  />
                  <P className="subtitle">{pageData?.page_subtitle}</P>
                </div>
              </HeroBannerWrapper>
            </Hero>
          </TrainigenHeroWrapper>

          <section className="mb-[40px] md:mb-[80px]">
            <Container>
              <div className="block relative mt-[-120px] md:mt-[-80px] md:flex gap-10">
                <InfoCard
                  variant="ideal"
                  title={pageData?.training_1_title}
                  description={pageData?.training_1_description}
                  icon="/handsake.svg"
                  className=" h-[100%] flex flex-col"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#FE517E] text-[18px] font-[400] text-[#fff] border-[#fff] mt-[20px]"
                      href={pageData?.cta_section_block_1_button_url}
                    >
                      {pageData?.training_1_button_label}
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="follow"
                  title={pageData?.training_2_title}
                  description={pageData?.training_2_description}
                  icon="/note.svg"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#3FC7B4] text-[18px] font-[400] text-[#fff] border-[#fff]"
                      href={pageData?.training_2_button_url}
                    >
                      {pageData?.training_2_button_label}
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </section>
          <section>
            <Container>
              <div className="p-[32px] bg-[#EBFFFC]">
                <H3 className="text-left md:leading-[140%] md:text-center">
                  {pageData?.work_plan_title}
                </H3>
                <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                  <Button
                    variant="secondary"
                    className="w-[100%] bg-[#3FC7B4] text-[18px] font-[400] text-[#fff] border-[#fff] mt-[20px]"
                    href={pageData?.work_plan_button_url}
                  >
                    {pageData?.work_plan_button_label}
                  </Button>
                </div>
              </div>
            </Container>
          </section>
          <PackageWrapper className="mt-[40px] md:mt-[80px]">
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.volunteer_package_title}
                  headerElement="h3"
                  color="black"
                  className="text-[42px] font-[400]"
                />
                <P className="max-w-4xl font-[400]">
                  {pageData?.volunteer_package_description}
                </P>
              </div>
            </Container>
            <Container>
              <div className="package-container flex flex-wrap gap-[32px]">
                {pageData?.volunteer_package_block?.map(
                  (volunteerpackage: any, index: number) => (
                    <div
                      className={
                        index === 0 || index === 3
                          ? `p-[20px] md:p-[32px] bg-[#FFECF1] md:w-[calc(50%-20px)] hover:shadow-lg`
                          : `p-[20px] md:p-[32px] bg-[#EBFFFC] md:w-[calc(50%-20px)] hover:shadow-lg`
                      }
                      key={volunteerpackage.title}
                    >
                      <H3
                        style={{ fontFamily: "Fjalla One" }}
                        className="text-[32px] md:text-[42px]"
                      >
                        {volunteerpackage.title}
                      </H3>
                      <P
                        style={{ fontFamily: "Avenir" }}
                        className="leading-[160%] text-[16px] md:text-[18px]"
                      >
                        {volunteerpackage.description}
                      </P>
                    </div>
                  )
                )}
              </div>
            </Container>
          </PackageWrapper>
          <TrainigenIdealWrapper>
            <Container>
              <div className="ideal-container block relative md:flex gap-10">
                <InfoCard
                  variant="follow"
                  mediaSrc={pageData?.cta_block_1_video?.id}
                  poster={pageData?.cta_block_1_poster.id}
                  videoClassName="h-[180px]"
                  title={pageData?.cta_1_title}
                  description={pageData?.cta_1_description}
                  icon={parseImageURL(pageData?.cta_block_1_title_icon?.id)}
                  className="h-[100%] flex flex-col"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#3FC7B4] text-[18px] font-[400] text-[#fff] border-[#fff]"
                      href={pageData?.cta_1_button_url}
                    >
                      {pageData?.cta_1_button_label}
                    </Button>
                  </div>
                </InfoCard>
                <InfoCard
                  variant="ideal"
                  title={pageData?.cta_2_title}
                  description={pageData?.cta_2_description}
                  icon={
                    parseImageURL(pageData?.cta_block_2_title_icon?.id) || ""
                  }
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                  mediaSrc={pageData?.cta_block_2_video?.id}
                  poster={pageData?.cta_block_2_poster?.id}
                  videoClassName="h-[180px]"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#FE517E] text-[18px] font-[400] text-[#fff] border-[#fff] mt-[20px]"
                      href={pageData?.cta_2_button_url}
                    >
                      {pageData?.cta_2_button_label}
                    </Button>
                  </div>
                </InfoCard>
              </div>
            </Container>
          </TrainigenIdealWrapper>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default VolunteersTrainingPage;
