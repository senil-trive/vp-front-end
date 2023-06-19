import React from "react";

import { H3, H4, P, TitleWithHighlights } from "../../components/typography";
import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import { Container, Grid } from "@mui/material";
import ENDPOINTS from "../../constants/endpoints";
import { FiChevronsDown } from "react-icons/fi";
import { Hero } from "../../components/layout";
import { Letter } from "../../types/content-types/Letter.type";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { getLetters } from "../../utils/api";
import parseImageURL from "../../utils/parseImageURL";
import { FaChevronDown } from "react-icons/fa";
import InfoCard from "../../components/content-types/InfoCard/InfoCard";
import Button from "../../components/buttons/Button";

interface LettersOverviewPageProps {
  pageData: any;
  lettersData: Letter[];
}

export const getServerSideProps = async () => {
  // ${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=*.*.*
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=highlighted_letter.*,*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();
    const lettersReq = await getLetters({
      postPerPage: POST_PER_PAGE,
      filter: `filter[id][_neq]=${pageRes?.data?.highlighted_letter?.id}`,
    });

    const lettersRes = await lettersReq.json();
    return {
      props: {
        pageData: pageRes.data,
        lettersData: lettersRes.data,
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

const LettersOverviewPage: React.FC<LettersOverviewPageProps> = ({
  pageData,
  lettersData,
}) => {
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
          canonical: "https://www.villapinedo.nl/open-brieven",
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
              minHeight: 497,
              position: "relative",
            }}
            mobileImageHeight={572}
          >
            <div className="flex flex-col max-w-2xl md:items-center md:justify-center md:text-center md:max-w-4xl mb-0 mt-[-80px] md:mt-[-40px]">
              <TitleWithHighlights
                //highlightColor="info"
                text={pageData?.page_title}
                // textToHighlight={pageData?.page_title_highlighted}
                headerElement="h1"
                color="white"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  lineHeight: `140%`,
                }}
                className="text-[#fff] m-[0px] text-[46px] font-[400] md:text-[64px]"
              />
              <P
                style={{
                  textAlign: "center",
                  fontFamily: "Avenir",
                  fontStyle: "normal",
                  fontWeight: `300`,
                  fontSize: `18px`,
                  lineHeight: `160%`,
                  color: `white`,
                  margin: 0,
                }}
              >
                {pageData?.page_subtitle}
              </P>
            </div>
          </Hero>
          <section className="mb-20 mt-[-120px] relative">
            <Container maxWidth={`xl`}>
              <div className="block relative mt-[-250px] md:flex gap-10 md:mt-[-80px]">
                {pageData?.intro_title && (
                  <InfoCard
                    variant="blog"
                    imageUrl="/trainingfooterhead.png"
                    title={pageData?.intro_title}
                    description={pageData?.intro_description}
                    icon="/notewrite.png"
                    category="Thema"
                    className="small-fonts text-[#fff] h-[100%] flex flex-col mb-[40px] md:mb-[0]"
                  >
                    <div className="flex justify-center  mt-[20px] md:mt-[auto]">
                      <Button
                        variant="secondary"
                        className="w-[100%] text-[18px] font-[400] bg-[#fff] text-[#FE517E] border-[#fff] hover:bg-[#FE517E]"
                        href={`/open-brieven/${pageData?.highlighted_letter?.slug}`}
                      >
                        Download brief
                      </Button>
                    </div>
                  </InfoCard>
                )}

                {pageData?.highlighted_letter && (
                  <InfoCard
                    variant="primary"
                    imageUrl={parseImageURL(
                      pageData?.highlighted_letter?.image?.id
                    )}
                    title={pageData?.highlighted_letter?.title}
                    description={pageData?.highlighted_letter?.description}
                    icon={"/notewrite.png"}
                    category="Thema"
                    className="small-fonts hover:bg-[#fff] text-[#fff] h-[100%] flex flex-col"
                  >
                    <div className="flex justify-center mt-[20px] md:mt-[auto]">
                      <Button
                        variant="secondary"
                        className="w-[100%] text-[18px] font-[400] bg-[#fff] text-[#006EF7] border-[#fff] hover:bg-[#006EF7]"
                        href={`/open-brieven/${pageData?.highlighted_letter?.slug}`}
                      >
                        Download brief
                      </Button>
                    </div>
                  </InfoCard>
                )}
              </div>
            </Container>
          </section>
          <section>
            <Container>
              <div className="flex flex-col items-center justify-center my-[50px] md:my-[100px]">
                <H4
                  style={{
                    margin: 0,
                    fontFamily: "Fjalla One",
                    fontStyle: `normal`,
                    fontWeight: `400`,
                    lineHeight: `150%`,
                    textAlign: `center`,
                  }}
                  className="text-[16px] md:text-[18px]"
                >
                  Meer open brieven, bekijk <br /> ze allemaal!
                </H4>
                <div className="mt-7 text-2xl p-3 rounded-full bg-[#FE517E] text-white">
                  <FaChevronDown stroke="white" color="white" />
                </div>
              </div>
            </Container>
            <Container maxWidth="xl" className="open-brieven-font">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20">
                {lettersData.map((letter: Letter) => (
                  <BriefItem
                    key={letter.id}
                    title={letter.title}
                    content={letter.description}
                    imgSrc={parseImageURL(letter.image?.id)}
                    fileSrc={`/open-brieven/${letter.slug}`}
                    bg={letter.bg_color}
                    imgHeight={180}
                  />
                ))}
              </div>
            </Container>
          </section>
        </main>
      </PageWrapper>
    </div>
  );
};

export default LettersOverviewPage;
