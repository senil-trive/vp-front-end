import { H1, H3, P, TitleWithHighlights } from "../../../components/typography";
import { Header, Hero } from "../../../components/layout";

import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";

import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";

type VolunteersSignupPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_signup_page?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();

    if (!pageRes?.data) {
      return {
        notFound: true,
      };
    }

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

const VolunteersFAQPage: React.FC<VolunteersSignupPageProps> = ({
  pageData,
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
                headerElement="h1"
                color="primary"
                highlightColor="info"
                text={pageData?.page_title}
                textToHighlight={pageData?.page_title_highlighted}
              />
              <P>{pageData?.page_subtitle}</P>
            </div>
          </Hero>

          {/* <section className="my-[200px] text-center py-20">
            
          </section> */}
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;
