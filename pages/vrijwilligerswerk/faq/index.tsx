import { P, TitleWithHighlights } from "../../../components/typography";
import { getFaqOverviewData, getFaqs } from "../../../utils/api";

import FAQList from "../../../components/content-types/FAQList/FAQList";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { VolunteersFAQPageProps } from "../../../types/pageTypes";
import parseImageURL from "../../../utils/parseImageURL";
import { useState } from "react";

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
        pageData: pageRes.data,
        faqData: faqRes.data,
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

  console.log(`faq data :::`, pageData);
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
    <div>
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
          <Hero imageUrl={parseImageURL(pageData?.background_image.id)}>
            <div className="flex flex-col items-center justify-center text-center max-w-4xl my-16">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                textToHighlight="vrijwilligers"
                headerElement="h1"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  fontWeight: `400`,
                  fontSize: `64px`,
                  lineHeight: `140%`,
                  color: `white`,
                }}
              />
              <P
                style={{
                  fontStyle: `normal`,
                  fontWeight: `300`,
                  fontSize: `18px`,
                  lineHeight: `160%`,
                  color: `white`,
                }}
                className="font-avenir"
              >
                {pageData?.page_subtitle}
              </P>
            </div>
          </Hero>

          <FAQList
            items={items}
            isLoading={isLoading}
            showLoadMore={showMoreButton}
            onLoadMore={changePage}
          />
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;
