import { H3, H4, P, TitleWithHighlights } from "../../../components/typography";

import BriefItem from "../../../components/content-types/BriefItem/BriefItem";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { FiChevronsDown } from "react-icons/fi";
import { Hero } from "../../../components/layout";
import { Letter } from "../../../types/content-types/Letter.type";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import TextItem from "../../../components/content-types/TextItem/TextItem";
import { parseFileURL } from "../../../utils/parseFileURL";
import parseImageURL from "../../../utils/parseImageURL";
import { getLetters } from "../../../utils/api";

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

    const lettersReq = await getLetters();

    const pageRes = await pageReq.json();
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
        title={pageData?.page_title}
        description={pageData?.page_subtitle}
      >
        <main>
          <Hero>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                highlightColor="info"
                text={pageData?.page_title}
                textToHighlight={pageData?.page_title_highlighted}
                headerElement="h1"
                color="primary"
              />
              <P>{pageData?.page_subtitle}</P>
            </div>
          </Hero>

          <section className="my-20">
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
          </section>
          <section className="my-20">
            <Container>
              {pageData?.highlighted_letter && (
                <TextItem
                  title={pageData?.highlighted_letter?.title}
                  titleHighlighted={
                    pageData?.highlighted_letter?.title_highlighted
                  }
                  content={pageData?.highlighted_letter?.description}
                  imageURL={parseImageURL(
                    pageData?.highlighted_letter?.image?.id
                  )}
                  imageAlt={pageData?.highlighted_letter?.title}
                  showButton={true}
                  buttonLabel={"Download de brief"}
                  buttonURL={`/open-brieven/${pageData?.highlighted_letter?.slug}`}
                />
              )}
            </Container>
          </section>
          <section>
            <Container>
              <div className="flex flex-col items-center justify-center my-[100px]">
                <H4 variant="bold" color="primary" style={{ margin: 0 }}>
                  Meer open brieven
                </H4>
                <P>Bekijk ze allemaal</P>
                <FiChevronsDown className="text-2xl text-orange-500" />
              </div>
            </Container>
            <Container maxWidth="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {lettersData
                  .filter(
                    (letter: Letter) =>
                      letter.id !== pageData?.highlighted_letter?.id
                  )
                  .map((letter: Letter) => (
                    <BriefItem
                      key={letter.id}
                      title={letter.title}
                      titleHighlighted={letter.title_highlighted}
                      content={letter.description}
                      imgSrc={parseImageURL(letter.image?.id)}
                      fileSrc={`/open-brieven/${letter.slug}`}
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
