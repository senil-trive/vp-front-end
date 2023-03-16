import { P, TitleWithHighlights } from "../../../components/typography";

import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import StoryItem from "../../../components/content-types/StoryItem/StoryItem";
import { VolunteerStory } from "../../../types/content-types/VolunteerStory.type";

type VolunteersStoriesPageProps = {
  pageData: any;
  storiesData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_stories_page?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const lettersReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_stories?fields=*.*.*&filter[status][_eq]=published`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();
    const lettersRes = await lettersReq.json();

    return {
      props: {
        pageData: pageRes.data,
        storiesData: lettersRes.data,
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

const VolunteersFAQPage: React.FC<VolunteersStoriesPageProps> = ({
  pageData,
  storiesData,
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

          <Container maxWidth="xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-[80px]">
              {storiesData.map((story: VolunteerStory) => (
                <StoryItem
                  key={story.id}
                  title={story.title}
                  description={story.description}
                  image={story.image}
                  slug={story.slug}
                  volunteer_name={story.volunteer_name}
                />
              ))}
            </div>
          </Container>
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;
