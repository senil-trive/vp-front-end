import { H1, H3, P } from "../../../components/typography";

import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { FAQ } from "../../../types/content-types/FAQ.type";
import FAQItem from "../../../components/content-types/FAQItem/FAQItem";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { getFaqOverviewData, getFaqs } from "../../../utils/api";

type VolunteersFAQPageProps = {
  pageData: any;
  faqData: FAQ[];
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await getFaqOverviewData();
    const faqReq = await getFaqs({ postPerPage: 7 });

    const pageRes = await pageReq.json();
    const faqRes = await faqReq.json();

    return {
      props: {
        pageData: pageRes.data,
        faqData: faqRes.data,
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
              <H1 variant="bold">{pageData?.page_title}</H1>
              <P>{pageData?.page_subtitle}</P>
            </div>
          </Hero>

          <section className="my-[80px] text-center py-20">
            <Container>
              <div className="flex flex-col items-center justify-center mb-14">
                <H3 variant="bold" color="black">
                  Meest gestelde vragen
                </H3>
              </div>
            </Container>

            <Container>
              <div className="flex flex-col gap-8">
                {faqData?.map((faq: FAQ) => (
                  <FAQItem
                    key={faq.id}
                    title={faq.title}
                    description={faq.description}
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

export default VolunteersFAQPage;
