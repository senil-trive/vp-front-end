import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getPostOverviewPageData,
  getPosts,
  getPostsTotal,
} from "../../../utils/api";

import BlogItem from "../../../components/content-types/BlogItem/BlogItem";
import { BlogPageProps } from "../../../types/pageTypes";
import CollectionSearchBar from "../../../components/form/CollectionSearchBar/CollectionSearchBar";
import { FEED_TAGS } from "../../../constants/mockData";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import SortBar from "../../../components/form/SortBar/SortBar";
import TagList from "../../../components/buttons/TagList/TagList";
import parseImageURL from "../../../utils/parseImageURL";
import { useTheme } from "styled-components";
import { POST_PER_PAGE } from "../../../constants/app-configs";
import { Hero, Pagination } from "../../../components/layout";
import { H1, P } from "../../../components/typography";

export const getServerSideProps = async () => {
  try {
    const pageReq = await getPostOverviewPageData();
    const blogsReq = await getPosts({ postPerPage: POST_PER_PAGE });
    const countReq = await getPostsTotal();

    const pageRes = await pageReq.json();
    const blogRes = await blogsReq.json();
    const countRes = await countReq.json();

    return {
      props: {
        pageData: pageRes.data,
        blogsData: blogRes.data,
        totalPosts: countRes.data[0].count,
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
}: BlogPageProps) {
  const { colors } = useTheme();
  // const { query, push } = useRouter(); // TODO: also the pagination and search through url query
  const [posts, setPosts] = useState(blogsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };

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
          page: currentPage,
          search,
          sort,
        });
        const res = await req.json();

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPaginatedBlogs();
  }, [currentPage, search, sort]);

  return (
    <PageWrapper title="Blog en vlog overzicht">
      <Hero center>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1
                variant="bold"
                style={{ textAlign: "center", padding: "0 24px" }}
              >
                {pageData?.page_title}
              </H1>
              <P variant="light" style={{ textAlign: "center" }}>
                {pageData?.page_subtitle}
              </P>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container style={{ marginBottom: 21 }}>
          <Grid container>
            <Grid item xs={12}>
              <TagList tags={FEED_TAGS} />
            </Grid>
          </Grid>
        </Container>

        <CollectionSearchBar
          quote={pageData?.search_bar_quote ?? ""}
          onSearch={handleSearch}
        />
        <Container style={{ margin: "56px auto" }}>
          <Grid container spacing={"34px"}>
            <Grid item xs={12} md={9}>
              <P style={{ color: colors.primary }}>
                {search ? posts.length : totalPosts} blogs en vlogs
              </P>
            </Grid>
            <Grid item xs={12} md={3}>
              <SortBar onSort={handleSort} />
            </Grid>
            {posts.map((item, index) => (
              <Grid key={index} item xs={12} md={4}>
                <BlogItem
                  mediaSrc={item?.image?.id ? parseImageURL(item.image.id) : ""}
                  embedSrc={item.youtube_embed}
                  link={`blog/${item.slug}`}
                  type={item.type}
                  author={item.author}
                  content={item.content}
                  postDate={new Date(item.date_created)}
                  category={item.categories?.[0]?.categories_id?.name}
                  title={item.title}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {totalPosts / POST_PER_PAGE > 2 && posts.length >= POST_PER_PAGE && (
          <Pagination
            total={Math.ceil(totalPosts / POST_PER_PAGE)}
            truncated
            onChange={changePage}
          />
        )}
      </main>
    </PageWrapper>
  );
}
