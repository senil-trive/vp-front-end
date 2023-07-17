import { P, TitleWithHighlights } from "../../../components/typography";

import Button from "../../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { Hero } from "../../../components/layout";
import Image from "next/image";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import parseImageURL from "../../../utils/parseImageURL";
import { useTheme } from "styled-components";
import BlogItem from "../../../components/content-types/BlogItem/BlogItem";
import {
  PackageWrapper,
  TrainigenHeroWrapper,
  TrainigenIdealWrapper,
  TrainingBlogWrapper,
} from "../../../styles/Vrjwilligerswerk/TrainigenWrapper.styles";
import InfoCard from "../../../components/content-types/InfoCard/InfoCard";
import CommonDetailCard from "../../../components/content-types/CommonDetailCard/CommonDetailCard";
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
  console.log(pageData);
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
          <PackageWrapper className="mt-[40px] md:mt-[80px]">
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14">
                <TitleWithHighlights
                  text={pageData?.package_block_title}
                  headerElement="h3"
                  color="black"
                  className="text-[42px] font-[400]"
                />
                <P className="max-w-4xl font-[400]">
                  {pageData?.package_block_description}
                </P>
              </div>
            </Container>
            <Container>
              <div className="package-container flex flex-wrap">
                {pageData?.training_packages?.map((item: any) => (
                  <CommonDetailCard
                    title={item.title}
                    description={
                      <ul>
                        {item?.training_package_detail?.map((listItem: any) => (
                          <li
                            key={listItem}
                            className="packagelist-item text-[18px] font-[400]"
                          >
                            {listItem?.item}
                          </li>
                        ))}
                      </ul>
                    }
                    variant="follow"
                    key={item}
                    button={item?.view_package_button}
                    buttonLink={item?.view_package_link}
                  />
                ))}
              </div>
            </Container>
          </PackageWrapper>
          <TrainigenIdealWrapper>
            <Container>
              <div className="ideal-container block relative md:flex gap-10">
                <InfoCard
                  variant="follow"
                  title={pageData?.cta_1_title}
                  description={pageData?.cta_1_description}
                  icon="/eye.png"
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
                  icon="/note.svg"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
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
            <Image
              src={"/trainingfooterhead.png"}
              className="h-[554px] w-full relative"
              alt="tarining footer "
              fill
            />
          </TrainigenIdealWrapper>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default VolunteersTrainingPage;
