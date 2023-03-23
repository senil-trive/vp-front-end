import { Container } from "@mui/system";
import React from "react";
import { useTheme } from "styled-components";
import TextItem from "../../../components/content-types/TextItem/TextItem";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { P, TitleWithHighlights } from "../../../components/typography";
import { TheBookPageProps } from "../../../types/pageTypes";
import { getTheBookData } from "../../../utils/api";
import parseImageURL from "../../../utils/parseImageURL";

export const getServerSideProps = async () => {
  try {
    const pageReq = await getTheBookData();

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

export default function BookPage({ pageData }: TheBookPageProps) {
  const { colors } = useTheme();

  return (
    <div>
      <PageWrapper title={pageData?.page_title}>
        <main>
          <Hero>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                highlightColor="info"
                textToHighlight={pageData?.page_title_highlighted?.map(
                  (item) => item.value
                )}
                text={pageData?.page_title ?? ""}
                headerElement="h1"
                color="primary"
              />
              <P>{pageData?.page_subtitle}</P>
            </div>
          </Hero>

          <section
            className="py-[80px]"
            style={{ backgroundColor: colors.tertiary.light }}
          >
            <Container>
              <TextItem
                title={pageData?.media_section_1_title ?? ""}
                titleHighlighted={
                  pageData?.media_section_1_title_highlighted?.map(
                    (item) => item.value
                  ) ?? ""
                }
                content={pageData?.media_section_1_description ?? ""}
                imageURL={parseImageURL(pageData?.media_section_1_image?.id)}
                imageAlt={pageData?.media_section_1_title ?? ""}
                buttonLabel={pageData?.media_section_1_button_label}
                buttonURL={pageData?.media_section_1_button_url}
                buttonVariant="info"
                borderImg
                showButton
              />
            </Container>
          </section>
        </main>
      </PageWrapper>
    </div>
  );
}
