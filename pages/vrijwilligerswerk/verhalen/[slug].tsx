import { H3, TitleWithHighlights } from "../../../components/typography";

import BreadCrumbs from "../../../components/layout/BreadCrumbs/BreadCrumbs";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../../components/layout";
import Image from "next/image";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import StoryItem from "../../../components/content-types/StoryItem/StoryItem";
import VideoItem from "../../../components/content-types/VideoItem/VideoItem";
import { VolunteerStory } from "../../../types/content-types/VolunteerStory.type";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import parseImageURL from "../../../utils/parseImageURL";

type Props = {
  pageData: VolunteerStory;
  relatedStories: VolunteerStory[];
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the letters
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_stories?fields=*.*&filter[slug][_eq]=${slug}`,
      {
        method: "GET",
      }
    );

    const storiesReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteers_stories?fields=*.*.*&filter[status][_eq]=published`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await res.json();

    const { data: stories } = await storiesReq.json();

    if (!data?.[0]) {
      return {
        notFound: true,
      };
    }

    // shuffle letters
    const randomizedStories = stories
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return {
      props: {
        pageData: data[0] ?? null,
        relatedStories: randomizedStories,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function StoryDetail({ pageData, relatedStories }: Props) {
  return (
    <PageWrapper title={pageData.title}>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <Hero>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
            <TitleWithHighlights
              highlightColor="info"
              text={pageData?.title}
              headerElement="h1"
              color="primary"
            />
          </div>
        </Hero>
        <section>
          <Container>
            {pageData?.image && (
              <div className="mb-8 flex">
                <Image
                  className="object-cover object-center w-full h-[400px] rounded-lg"
                  src={parseImageURL(pageData?.image?.id)}
                  alt={pageData?.title}
                  width={600}
                  height={400}
                />
              </div>
            )}

            {pageData?.video && (
              <div className="mb-8">
                <VideoItem
                  title={pageData?.video?.title}
                  subtitle={pageData?.video?.subtitle}
                  src={pageData?.video?.video_file?.url}
                  key={pageData?.video?.id}
                  poster={parseImageURL(pageData?.video?.video_cover_image?.id)}
                />
              </div>
            )}
            <div className="mb-8">
              {pageData?.content && parseHTMLtoReact(pageData?.content)}
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col items-center justify-center my-[100px]">
              <H3 variant="bold" color="primary" style={{ margin: 0 }}>
                Meer verhalen
              </H3>
            </div>
          </Container>
          <Container maxWidth="xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
              {relatedStories.map((story: VolunteerStory) => (
                <StoryItem
                  key={story.id}
                  title={story.title}
                  volunteer_name={story.volunteer_name}
                  description={story.description}
                  image={story.image}
                  slug={story.slug}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </PageWrapper>
  );
}
