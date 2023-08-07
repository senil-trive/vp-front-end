import { H3, P, TitleWithHighlights } from "../../../components/typography";
import { getFaqOverviewData, getFaqs } from "../../../utils/api";

import FAQList from "../../../components/content-types/FAQList/FAQList";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { VolunteersFAQPageProps } from "../../../types/pageTypes";
import parseImageURL from "../../../utils/parseImageURL";
import { useState } from "react";
import Button from "../../../components/buttons/Button";
import { Container } from "@mui/material";
import { ContainerWrapper } from "../../../styles/Vrjwilligerswerk/index.styles";
import { HeroBannerWrapper } from "../../../styles/global.styled";

const POST_PER_PAGE = 7;

export const getServerSideProps = async () => {
  try {
    const pageReq = await getFaqOverviewData();
    const faqReq = await getFaqs({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    const faqRes = await faqReq.json();

    return {
      props: {
        pageData: pageRes.data || null,
        faqData: faqRes.data || null,
        totalFaqs: faqRes?.meta?.filter_count ?? 0,
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

const VolunteersFAQPage: React.FC<VolunteersFAQPageProps> = ({
  pageData,
  faqData,
  totalFaqs,
}) => {
  const [items, setItems] = useState(faqData);
  const [totalCount, setTotalCount] = useState(totalFaqs);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const showMoreButton =
    totalCount > items.length && totalCount > POST_PER_PAGE;

  const getPaginatedPost = async () => {
    setIsLoading(true);
    try {
      const req = await getFaqs({
        postPerPage: POST_PER_PAGE,
        page: currentPage,
        meta: "filter_count",
      });
      const res = await req.json();

      setItems([...items, ...(res.data ?? [])]);
      setTotalCount(res?.meta?.filter_count || 0);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const changePage = () => {
    setCurrentPage(currentPage + 1);
    getPaginatedPost();
  };

  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: pageData?.seo_description
          ? pageData?.seo_description
          : pageData?.page_subtitle,
        canonical: "https://www.villapinedo.nl/vrijwilligerswerk",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <main className="mb-[128px]">
        <Hero
          imageUrl={parseImageURL(pageData?.background_image?.id)}
          style={{
            minHeight: 455,
            position: "relative",
          }}
          mobileImageHeight={468}
        >
          <HeroBannerWrapper>
            <div className="title-wrap max-w-2xl md:max-w-4xl">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                textToHighlight="vrijwilligers"
                headerElement="h1"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  fontWeight: `400`,
                  color: `white`,
                }}
                className="title mt-[180px] md:mt-[80px]"
              />
              <P className="font-avenir subtitle">{pageData?.page_subtitle}</P>
            </div>
          </HeroBannerWrapper>
        </Hero>
        <ContainerWrapper className="volunteer-faq">
          <div className="relative mt-[-134px] md:mt-[-150px]">
            <FAQList
              items={items}
              isLoading={isLoading}
              showLoadMore={showMoreButton}
              onLoadMore={changePage}
              show={true}
              containerWidth={"md"}
            />
            <Container className="my-[80px]">
              <Button
                variant="link"
                style={{ border: "2px solid" }}
                className="w-[100%] text-[18px] font-[400] bg-transparent border-[#3FC7B4] text-[#3FC7B4] hover:text-[#fff] hover:bg-[#3FC7B4]"
              >
                meer lezen
              </Button>
            </Container>
          </div>
        </ContainerWrapper>

        <section className="my-[80px]">
          <Container className="max-w-[1384px]">
            <H3 className="mb-[18px]">{pageData?.another_question_title}</H3>
            <P
              style={{ fontFamily: "Avenir" }}
              className="text-[18px] font-[300] md:text-[18px]"
            >
              {pageData?.another_question_description}
            </P>
          </Container>
        </section>
      </main>
    </PageWrapper>
  );
};

export default VolunteersFAQPage;
