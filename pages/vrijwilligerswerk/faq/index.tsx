import { H1, H3, P } from "../../../components/typography";

import { CircularProgress, Container } from "@mui/material";
import { FAQ } from "../../../types/content-types/FAQ.type";
import FAQItem from "../../../components/content-types/FAQItem/FAQItem";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { getFaqOverviewData, getFaqs } from "../../../utils/api";
import { useState } from "react";
import { VolunteersFAQPageProps } from "../../../types/pageTypes";
import Button from "../../../components/buttons/Button";

const POST_PER_PAGE = 6;

export const getServerSideProps = async () => {
  try {
    const pageReq = await getFaqOverviewData();
    const faqReq = await getFaqs({ postPerPage: POST_PER_PAGE });

    const pageRes = await pageReq.json();
    const faqRes = await faqReq.json();

    return {
      props: {
        pageData: pageRes.data,
        faqData: faqRes.data,
        totalFaqs: faqRes?.meta?.total_count ?? 0,
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
        title={pageData?.page_title}
        description={pageData?.page_subtitle}
      >
        <main>
          <Hero>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <H1 variant="bold">{pageData?.page_title}</H1>
              <P>{pageData?.page_subtitle}</P>
            </div>
          </Hero>

          <section
            className="mt-[80px] text-center"
            style={{ marginBottom: totalCount > items.length ? 56 : 80 }}
          >
            <Container>
              <div className="flex flex-col items-center justify-center mb-14">
                <H3 variant="bold" color="black">
                  Meest gestelde vragen
                </H3>
              </div>
            </Container>

            <Container>
              <div className="flex flex-col gap-8">
                {items?.map((faq: FAQ) => (
                  <FAQItem
                    key={faq.id}
                    title={faq.title}
                    description={faq.description}
                  />
                ))}
              </div>
            </Container>
            <div className="flex items-center justify-center">
              {isLoading && <CircularProgress size={"30px"} />}
            </div>
          </section>

          {totalCount > items.length && (
            <Container style={{ marginBottom: 80 }}>
              <Button onClick={changePage}>Meer laden</Button>
            </Container>
          )}
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;
