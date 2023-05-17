import React from "react";

import { H3, H4, P, TitleWithHighlights } from "../../../components/typography";
import BriefItem from "../../../components/content-types/BriefItem/BriefItem";
import { Container, Grid } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { FiChevronsDown } from "react-icons/fi";
import { Hero } from "../../../components/layout";
import { Letter } from "../../../types/content-types/Letter.type";
import { POST_PER_PAGE } from "../../../constants/app-configs";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { getLetters } from "../../../utils/api";
import parseImageURL from "../../../utils/parseImageURL";
import { FaChevronDown } from "react-icons/fa";

interface LettersOverviewPageProps {
  pageData: any;
  lettersData: Letter[];
}

export const getServerSideProps = async () => {
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=*.*.*`,
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
  console.log(`letters data :::`, pageData);
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
          canonical: "https://www.villapinedo.nl/kinderen/open-brieven",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero
            center
            imageUrl={parseImageURL(`84086671-92b0-463f-bef1-1ea98a9b6c34`)}
            style={{
              minHeight: 649,
              position: "relative",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-2xl  mb-0">
              <TitleWithHighlights
                highlightColor="info"
                text={pageData?.page_title}
                // textToHighlight={pageData?.page_title_highlighted}
                headerElement="h1"
                color="white"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  fontWeight: `400`,
                  fontSize: `64px`,
                  lineHeight: `140%`,
                }}
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
                }}
              >
                {pageData?.page_subtitle}
              </P>
            </div>
          </Hero>

          {/* <section className="my-20">
            <Container>
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 110, 247, 0.6) 0%, #006EF7 100%)",
                }}
                className="p-20 rounded-lg"
              >
                <H3 color="white" variant="bold">
                  {pageData?.intro_title}
                </H3>
                <P color="white">{pageData?.intro_description}</P>
              </div>
            </Container>
          </section> */}
          <section className="mb-20 -translate-y-24">
            <Container maxWidth={`xl`}>
              <Grid spacing={`32px`} container>
                <Grid item xs={12} md={6} lg={6}>
                  {pageData?.intro_title && (
                    <BriefItem
                      key={`a23y2u0`}
                      title={pageData?.intro_title}
                      content={pageData?.intro_description}
                      imgSrc={parseImageURL(
                        `422e656a-7c18-41a3-b702-b07b17b00736`
                      )}
                      fileSrc={`/kinderen/open-brieven/${pageData?.highlighted_letter?.slug}`}
                      bg={`#FE517E`}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  {pageData?.highlighted_letter && (
                    <BriefItem
                      key={`a23y2u0`}
                      title={pageData?.highlighted_letter?.title}
                      content={pageData?.highlighted_letter?.description}
                      imgSrc={parseImageURL(
                        pageData?.highlighted_letter?.image?.id
                      )}
                      fileSrc={`/kinderen/open-brieven/${pageData?.highlighted_letter?.slug}`}
                      bg={`#006EF7`}
                    />
                  )}
                </Grid>
              </Grid>
            </Container>
          </section>
          <section>
            <Container>
              <div className="flex flex-col items-center justify-center my-[100px]">
                <H4
                  style={{
                    margin: 0,
                    fontFamily: "Fjalla One",
                    fontStyle: `normal`,
                    fontWeight: `400`,
                    fontSize: `18px`,
                    lineHeight: `150%`,
                    textAlign: `center`,
                  }}
                >
                  Meer open brieven, bekijk <br /> ze allemaal!
                </H4>
                <div className="mt-7 text-2xl p-3 rounded-full bg-[#FE517E] text-white">
                  <FaChevronDown stroke="white" color="white" />
                </div>
              </div>
            </Container>
            <Container maxWidth="xl" className="open-brieven-font">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {lettersData.map((letter: Letter) => (
                  <BriefItem
                    key={letter.id}
                    title={letter.title}
                    // titleHighlighted={letter.title_highlighted}
                    content={letter.description}
                    imgSrc={parseImageURL(letter.image?.id)}
                    fileSrc={`/kinderen/open-brieven/${letter.slug}`}
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
