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

type VolunteersTrainingPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_training_overview_page`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();
    console.log(pageRes, "page");
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
  console.log(pageData, "page");
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
              imageUrl={"/trainigenhead.png"}
              style={{
                minHeight: 555,
                position: "relative",
              }}
            >
              <div className="flex flex-col mt-[-290px] md:items-center md:justify-center md:text-center max-w-2xl md:mt-[-80px]">
                <TitleWithHighlights
                  highlightColor="info"
                  text={pageData?.page_title}
                  headerElement="h1"
                  color="primary"
                  className="text-white"
                />
                <P className="text-white">{pageData?.page_subtitle}</P>
              </div>
            </Hero>
          </TrainigenHeroWrapper>

          <TrainingBlogWrapper>
            <Container>
              <div className="training-blog">
                <BlogItem
                  embedSrc="https://www.youtube.com/embed/98do3PUk4cM"
                  link={`/kinderen/verhalen/`}
                  type={"vlog"}
                  author={"Naam van auteur"}
                  description={pageData?.training_1_description}
                  postDate={new Date("01/12/2023")}
                  category={"Thema"}
                  title={pageData?.training_1_title}
                  buttonText="training bekijken"
                />
                <BlogItem
                  embedSrc="https://www.youtube.com/embed/98do3PUk4cM"
                  link={`/kinderen/verhalen/`}
                  type={"vlog"}
                  author={"Naam van auteur"}
                  description={
                    "Iedereen die binnen Villa Pinedo met vrijwilligerswerk begint, krijgt de basistraining. In deze training leer jij meer over de werkzaamheden die je voor Villa Pinedo zou willen doen. Je leert je eigen ervaringen die je als kind van gescheiden ouders hebt, in te zetten om anderen te helpen."
                  }
                  postDate={new Date("01/12/2023")}
                  category={"Thema"}
                  title={"verdiepingstraining"}
                  buttonText="training bekijken"
                />
              </div>
            </Container>
          </TrainingBlogWrapper>
          <PackageWrapper className="mt-[40px] md:mt-[80px]">
            <Container>
              <div className="flex flex-col items-center justify-center mb-6 md:mb-14">
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
              <div className="package-container flex flex-wrap">
                {pageData?.training_packages?.map((item: any) => (
                  <CommonDetailCard
                    title={item.title}
                    description={
                      <ul>
                        {item?.training_package_detail?.map((listItem: any) => (
                          <li key={listItem} className="packagelist-item">
                            <img
                              src="/icons8-tick.svg"
                              alt="packagelist iocns"
                            />
                            {listItem?.item}
                          </li>
                        ))}
                      </ul>
                    }
                    variant="info"
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
                  variant="blog"
                  title={pageData?.cta_1_title}
                  description={pageData?.cta_1_description}
                  icon="/eye.png"
                  className=" hover:bg-[#FE517E] text-[#fff] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[#FE517E] border-[#fff]"
                      href={pageData?.cta_1_button_url}
                    >
                      {pageData?.cta_1_button_label}
                    </Button>
                  </div>
                </InfoCard>

                <InfoCard
                  variant="primary"
                  title={pageData?.cta_2_title}
                  description={pageData?.cta_2_description}
                  icon="/note.svg"
                  className="mt-[32px] md:mt-[0px] h-[100%] flex
                  flex-col"
                >
                  <div className="flex justify-center mt-[20px] md:mt-[auto]">
                    <Button
                      variant="secondary"
                      className="w-[100%] bg-[#fff] text-[#006EF7] border-[#fff]"
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
    </div>
  );
};

export default VolunteersTrainingPage;
