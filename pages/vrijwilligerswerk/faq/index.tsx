import { P, TitleWithHighlights } from "../../../components/typography";
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
    <ContainerWrapper className="voluntee">
      <PageWrapper
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: pageData?.seo_description
            ? pageData?.seo_description
            : pageData?.page_subtitle,
          canonical: "https://www.villapinedo.nl/vrijwilligerswerk",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main>
          <Hero imageUrl={parseImageURL(pageData?.background_image?.id, 1410)}>
            <div className="flex flex-col max-w-2xl md:items-center md:justify-center md:text-center md:max-w-4xl my-16">
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
                className="text-[46px] md:leading-[140%] md:text-[64px]"
              />
              <P
                style={{
                  fontStyle: `normal`,
                  fontWeight: `300`,
                  lineHeight: `160%`,
                  color: `white`,
                }}
                className="font-avenir text-[20px] md:text-[18px] md:mt-[-10px]"
              >
                {pageData?.page_subtitle}
              </P>
            </div>
          </Hero>
          <div className="relative mt-[-134px] md:mt-[0px]">
            <FAQList
              items={items}
              isLoading={isLoading}
              showLoadMore={showMoreButton}
              onLoadMore={changePage}
            />
            <Container className="mb-[80px]">
              <Button
                variant="link"
                style={{ border: "2px solid" }}
                className="w-[100%] text-[18px] font-[400] border-[#3FC7B4] text-[#3FC7B4] hover:text-[#fff] hover:bg-[#3FC7B4]"
              >
                meer lezen
              </Button>
            </Container>
          </div>
        </main>
      </PageWrapper>
    </ContainerWrapper>
  );
};

export default VolunteersFAQPage;
