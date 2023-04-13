import { CircularProgress, Container } from "@mui/material";
import { Grid, Hero } from "../components/layout";
import { P, TitleWithHighlights } from "../components/typography";
import { getContentTags, getFeed, getHomeData } from "../utils/api";
import { useCallback, useEffect, useState } from "react";

import { HomePageProps } from "../types/pageTypes";
import { MasonryGrid } from "../components/layout/MasonryGrid/MasonryGrid";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import TagList from "../components/buttons/TagList/TagList";
import { generateFeedTiles } from "../utils/feed-utils";
import parseImageURL from "../utils/parseImageURL";
import { useCallbackWhenReachedBottom } from "../utils/scroll";

const POST_PER_PAGE = 6;
export const getServerSideProps = async () => {
  try {
    const pageReq = await getHomeData();
    const categoriesReq = await getContentTags();

    const pageRes = await pageReq.json();
    const categoriesRes = await categoriesReq.json();

    const {
      blogsRes,
      instagramRes,
      tiktokRes,
      forumRes,
      lettersRes,
      videosRes,
    } = await getFeed({ postPerPage: POST_PER_PAGE, meta: "filter_count" });

    return {
      props: {
        pageData: pageRes.data,
        feed: generateFeedTiles(
          {
            blogs: blogsRes.data,
            forum: forumRes.data,
            letters: lettersRes.data,
            instagram: instagramRes.data,
            tiktok: tiktokRes.data,
            videos: videosRes.data,
          },
          true
        ),
        totalPosts:
          blogsRes.meta.filter_count +
            forumRes.meta.filter_count +
            lettersRes.meta.filter_count +
            instagramRes.meta.filter_count +
            videosRes.meta.filter_count +
            tiktokRes.meta.filter_count || 0,
        categories: categoriesRes.data,
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

export default function Home({
  pageData,
  categories,
  feed,
  totalPosts,
}: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(feed);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const getAllFeedItem = useCallback(
    async ({
      append = false,
      selectedTag,
    }: {
      append: boolean;
      selectedTag: string;
    }) => {
      setIsLoading(true);

      console.log({ nextPage: currentPage + 1 });

      try {
        const {
          blogsRes,
          instagramRes,
          tiktokRes,
          forumRes,
          lettersRes,
          videosRes,
        } = await getFeed({
          postPerPage: POST_PER_PAGE,
          page: currentPage + 1,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter[categories][categories_id][id][_eq]=${selectedTag}`
              : ``,
        });

        const res = generateFeedTiles(
          {
            blogs: blogsRes?.data ?? [],
            forum: forumRes?.data ?? [],
            letters: lettersRes?.data ?? [],
            instagram: instagramRes?.data ?? [],
            tiktok: tiktokRes?.data ?? [],
            videos: videosRes?.data ?? [],
          },
          // generated first tiles only when its the first load
          false
        );

        if (append) {
          setPosts([...posts, ...res]);
        } else {
          setPosts(res);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, posts]
  );

  useCallbackWhenReachedBottom(async () => {
    if (posts.length < totalPosts && !selectedTag && !isLoading) {
      getAllFeedItem({ append: true, selectedTag: "" });
      setCurrentPage((page) => page + 1);
    }

    if (posts.length >= totalPosts) {
      setIsEnd(true);
    }
  });

  useEffect(() => {
    if (selectedTag) {
      getAllFeedItem({ append: false, selectedTag });
    } else {
      setPosts(feed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed, selectedTag]);

  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title,
        description: pageData?.seo_title,
        canonical: "https://www.villapinedo.nl",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : undefined,
      }}
    >
      <Hero center>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <div className="text-center">
                <TitleWithHighlights
                  text={pageData?.page_title ?? ""}
                  style={{ textAlign: "center" }}
                />

                <P variant="light">{pageData?.page_subtitle}</P>
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>
      <main style={{ marginBottom: "80px" }}>
        <div style={{ marginBottom: 32 }}>
          <TagList
            tags={categories.map((cat) => ({
              id: cat.id,
              name: cat.name,
              status: cat.status,
            }))}
            selected={selectedTag}
            onSelect={(x: string) => {
              setSelectedTag(x);
            }}
          />
        </div>

        <MasonryGrid feed={posts} />

        <div className="flex items-center justify-center">
          {isLoading && <CircularProgress size={"30px"} />}
          {isEnd && (
            <P color="info">
              Geen posts {posts.length <= 0 ? "" : "meer"} om te tonen
            </P>
          )}
        </div>
      </main>
    </PageWrapper>
  );
}
