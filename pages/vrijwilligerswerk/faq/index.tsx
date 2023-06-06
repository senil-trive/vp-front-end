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
          <Hero imageUrl={parseImageURL(pageData?.background_image)}>
            <div className="flex flex-col md:items-center md:justify-center md:text-center max-w-2xl my-16">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                textToHighlight="vrijwilligers"
                headerElement="h1"
                style={{
                  fontFamily: "Fjalla One",
                  fontStyle: `normal`,
                  fontWeight: `400`,
                  lineHeight: `140%`,
                  color: `white`,
                }}
                className="text-[46px] md:text-[64px]"
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
          <div className="relative mt-[-134px] md:mt-[0px]">
            <FAQList
              items={items}
              isLoading={isLoading}
              showLoadMore={showMoreButton}
              onLoadMore={changePage}
            />
          </div>
          <div></div>
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;
