import { MasonryGrid } from "../components/layout/MasonryGrid/MasonryGrid";
import { Grid, Hero } from "../components/layout";
import { P, TitleWithHighlights } from "../components/typography";
import { getContentTags, getFeed, getHomeData } from "../utils/api";

import { CircularProgress, Container } from "@mui/material";
import { HomePageProps } from "../types/pageTypes";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import TagList from "../components/buttons/TagList/TagList";
import { generateFeedTiles } from "../utils/feed-utils";
import { useCallback, useEffect, useState } from "react";
import { useCallbackWhenReachedBottom } from "../utils/scroll";

const POST_PER_PAGE = 6;
export const getServerSideProps = async () => {
  try {
    const pageReq = await getHomeData();
    const categoriesReq = await getContentTags();

    const pageRes = await pageReq.json();
    const categoriesRes = await categoriesReq.json();

    const { blogsRes, instagramRes, tiktokRes, forumRes, lettersRes } =
      await getFeed({ postPerPage: POST_PER_PAGE, meta: "filter_count" });

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
          },
          true
        ),
        totalPosts:
          blogsRes.meta.filter_count +
            forumRes.meta.filter_count +
            lettersRes.meta.filter_count +
            instagramRes.meta.filter_count +
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
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const getAllFeedItem = useCallback(
    async (append = true) => {
      setIsLoading(true);

      try {
        const { blogsRes, instagramRes, tiktokRes, forumRes, lettersRes } =
          await getFeed({
            postPerPage: POST_PER_PAGE,
            page: currentPage + 1,
            meta: "filter_count",
            filter:
              selectedTag.length > 0
                ? `filter={"categories": { "categories_id": { "id": { "_eq": "${selectedTag}"}}}}`
                : ``,
          });

        const res = generateFeedTiles(
          {
            blogs: blogsRes?.data ?? [],
            forum: forumRes?.data ?? [],
            letters: lettersRes?.data ?? [],
            instagram: instagramRes?.data ?? [],
            tiktok: tiktokRes?.data ?? [],
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
    [currentPage, posts, selectedTag]
  );

  useCallbackWhenReachedBottom(async () => {
    if (posts.length < totalPosts && !selectedTag) {
      getAllFeedItem();
      setCurrentPage((page) => page + 1);
    } else {
      setIsEnd(true);
    }
  });

  useEffect(() => {
    if (selectedTag) {
      getAllFeedItem(false);
    }
  }, [getAllFeedItem, selectedTag]);

  return (
    <PageWrapper
      title={pageData?.page_title}
      description="Praten, lachen, klagen of huilen omdat je ouders uit elkaar zijn kan hier bij Villa Pinedo. Stel jouw vragen aan anderen die begrijpen wat jij meemaakt en deel wat er in jouw hoofd en hart omgaat."
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
