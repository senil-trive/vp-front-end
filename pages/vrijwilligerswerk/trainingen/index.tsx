import { H3, H4, P, TitleWithHighlights } from "../../../components/typography";

import Button from "../../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { Hero } from "../../../components/layout";
import Image from "next/image";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import parseImageURL from "../../../utils/parseImageURL";
import parseVideoURL from "../../../utils/parseVideoURL";
import { useTheme } from "styled-components";

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
        pageData: pageRes.data,
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

const VolunteersTrainingPage: React.FC<VolunteersTrainingPageProps> = ({
  pageData,
}) => {
  const { colors } = useTheme();

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

          <section className="my-[80px]">
            <Container>
              <div className="text-center">
                <H3 variant="bold">{pageData?.basic_training_block_title}</H3>
                <P>{pageData?.basic_training_block_subtitle}</P>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-14 mx-auto">
                <div className="rounded-lg bg-white border-2 border-orange-900 p-6">
                  {pageData?.training_1_video?.id ? (
                    <video
                      className="rounded-lg h-[256px] w-full object-cover mb-[40px]"
                      src={parseVideoURL(pageData?.training_1_video?.id)}
                      controls
                      poster={parseImageURL(pageData?.training_1_image?.id)}
                    ></video>
                  ) : pageData?.training_1_image?.id ? (
                    <Image
                      className="rounded-lg h-[256px] object-cover mb-[40px]"
                      src={parseImageURL(pageData?.training_1_image?.id)}
                      width={500}
                      height={300}
                      alt={pageData?.training_1_title}
                    />
                  ) : null}

                  <H4 variant="bold">{pageData?.training_1_title}</H4>
                  <P>{pageData?.training_1_description}</P>
                </div>
                <div className="rounded-lg bg-white border-2 border-orange-900 p-6">
                  {pageData?.training_2_video?.id ? (
                    <video
                      className="rounded-lg h-[256px] w-full object-cover mb-[40px]"
                      src={parseVideoURL(pageData?.training_2_video?.id)}
                      controls
                      poster={parseImageURL(pageData?.training_2_image?.id)}
                    ></video>
                  ) : pageData?.training_2_image?.id ? (
                    <Image
                      className="rounded-lg h-[256px] object-cover mb-[40px]"
                      src={parseImageURL(pageData?.training_2_image?.id)}
                      width={500}
                      height={300}
                      alt={pageData?.training_2_title}
                    />
                  ) : null}
                  <H4 variant="bold">{pageData?.training_2_title}</H4>
                  <P>{pageData?.training_2_description}</P>
                </div>
              </div>
            </Container>
          </section>

          <section
            className="mt-[80px] text-center py-[80px]"
            style={{
              backgroundColor: colors.tertiary.light,
            }}
          >
            <Container>
              <div className="text-center">
                <H3 variant="bold">{pageData?.package_block_title}</H3>
                <P>{pageData?.package_block_description}</P>
              </div>

              <div className="flex flex-col gap-12 mt-12">
                <div className="rounded-lg bg-white border-2 border-orange-900 p-6">
                  <H4 variant="bold">{pageData?.package_1_title}</H4>
                  <P>{pageData?.package_1_description}</P>
                </div>
                <div className="rounded-lg bg-white border-2 border-orange-900 p-6">
                  <H4 variant="bold">{pageData?.package_2_title}</H4>
                  <P>{pageData?.package_2_description}</P>
                </div>
              </div>

              <div className="flex items-center justify-center mt-11 w-fit mx-auto">
                <Button variant="primary" href="/vrijwilligerswerk/aanmelden">
                  Aanmelden als vrijwilliger
                </Button>
              </div>
            </Container>
          </section>
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersTrainingPage;
