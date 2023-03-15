import { CircularProgress, Container, Grid } from "@mui/material";
import { P, TitleWithHighlights } from "../../../components/typography";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  getContentTags,
  getPostOverviewPageData,
  getPosts,
} from "../../../utils/api";
import { BlogPageProps } from "../../../types/pageTypes";
import CollectionSearchBar from "../../../components/form/CollectionSearchBar/CollectionSearchBar";
import { Hero } from "../../../components/layout";
import { MasonryGrid } from "../../../components/layout/MasonryGrid/MasonryGrid";
import { POST_PER_PAGE } from "../../../constants/app-configs";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import SortBar from "../../../components/form/SortBar/SortBar";
import TagList from "../../../components/buttons/TagList/TagList";
import { useCallbackWhenReachedBottom } from "../../../utils/scroll";
import { useTheme } from "styled-components";

export const getServerSideProps = async () => {
  try {
    const pageReq = await getPostOverviewPageData();
    const tagsReq = await getContentTags();
    const blogsReq = await getPosts({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    const blogRes = await blogsReq.json();
    const tagsRes = await tagsReq.json();

    return {
      props: {
        pageData: pageRes.data,
        blogsData: blogRes.data,
        totalPosts: blogRes.meta.filter_count,
        tags: tagsRes.data,
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

export default function Forum({
  pageData,
  blogsData,
  totalPosts,
  tags,
}: BlogPageProps) {
  const { colors } = useTheme();
  const [posts, setPosts] = useState(blogsData);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useCallbackWhenReachedBottom(async () => {
    if (posts.length < totalCount) {
      setIsLoading(true);
      try {
        const req = await getPosts({
          postPerPage: POST_PER_PAGE,
          page: currentPage + 1,
          search,
          sort,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter={"categories": { "categories_id": { "id": { "_eq": "${selectedTag}"}}}}`
              : ``,
        });
        const res = await req.json();

        setPosts([...posts, ...(res.data || [])]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }

      setCurrentPage((page) => page + 1);
    } else {
      setIsEnd(true);
    }
  });

  const handleSearch = (x: string) => {
    setSearch(x);
    setCurrentPage(1);
  };

  const handleSort = (x: string) => {
    setSort(x);
  };

  useEffect(() => {
    const getPaginatedBlogs = async () => {
      try {
        const req = await getPosts({
          postPerPage: POST_PER_PAGE,
          // page: currentPage,
          search,
          sort,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter={"categories": { "categories_id": { "id": { "_eq": "${selectedTag}"}}}}`
              : ``,
        });
        const res = await req.json();
        setPosts(res.data || []);
        setTotalCount(res.meta.filter_count || 0);
      } catch (error) {
        console.log(error);
      }
    };

    getPaginatedBlogs();
  }, [search, sort, selectedTag]);

  return (
    <PageWrapper title="Blog en vlog overzicht">
      <Hero center>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                style={{ textAlign: "center", padding: "0 24px" }}
                textToHighlight={["Blog", "Vlogs"]}
              />
              <P variant="light" style={{ textAlign: "center" }}>
                {pageData?.page_subtitle}
              </P>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <TagList
          tags={tags}
          selected={selectedTag}
          onSelect={(x: string) => {
            if (x === selectedTag) {
              setSelectedTag("");
            } else {
              setSelectedTag(x);
            }
          }}
        />

        <CollectionSearchBar
          quote={pageData?.search_bar_quote ?? ""}
          onSearch={handleSearch}
        />

        <div style={{ margin: "56px auto" }}>
          <Container style={{ marginBottom: "38px" }}>
            <Grid container spacing={"31px"}>
              <Grid item xs={12} md={9}>
                <P style={{ color: colors.primary }}>
                  {totalCount} blogs en vlogs
                </P>
              </Grid>
              <Grid item xs={12} md={3}>
                <SortBar onSort={handleSort} />
              </Grid>
            </Grid>
          </Container>
          <MasonryGrid
            feed={posts.map((item) => ({
              id: `blog-${uuidv4()}`,
              type: "blog",
              width: 4,
              content: item,
            }))}
          />
        </div>

        <div className="flex items-center justify-center">
          {isLoading && <CircularProgress size={"30px"} />}
          {isEnd && <P color="info">Geen posts meer om te tonen</P>}
        </div>
      </main>
    </PageWrapper>
  );
}
