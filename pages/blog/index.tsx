import { Container, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import TagList from "../../components/buttons/TagList/TagList";
import BlogItem from "../../components/content-types/BlogItem/BlogItem";
import CollectionSearchBar from "../../components/form/CollectionSearchBar/CollectionSearchBar";
import { Hero, Pagination } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../../components/typography";
import { FEED_TAGS } from "../../constants/mockData";
import { BlogPageProps } from "../../types/pageTypes";
import {
  getPostOverviewPageData,
  getPosts,
  getPostsTotal,
} from "../../utils/api";
import parseImageURL from "../../utils/parseImageURL";

const postPerPage = 9;
export const getServerSideProps = async () => {
  try {
    const pageReq = await getPostOverviewPageData();
    const blogsReq = await getPosts(postPerPage);
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

  useEffect(() => {
    const getPaginatedBlogs = async (q?: string) => {
      try {
        const req = await getPosts(postPerPage, currentPage, q);
        const res = await req.json();

        console.log(res.data);

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPaginatedBlogs(search);
  }, [currentPage, search]);

  return (
    <PageWrapper title="Forum overzicht">
      <Hero center>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
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
        <Container style={{ marginBottom: 56 }}>
          <Grid container style={{ marginBottom: "32px" }}>
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
              {/* <Dropdown
                name="sort"
                placeholder="Sorteer op"
                options={[{ name: "test", value: "test" }]}
              /> */}
            </Grid>
            {posts.map((item, index) => (
              <Grid key={index} item xs={12} md={4}>
                <Link href={`blog/${item.id}`}>
                  <BlogItem
                    mediaSrc={
                      item?.image?.id ? parseImageURL(item.image.id) : ""
                    }
                    embedSrc={item.youtube_embed}
                    link={`blog/${item.id}`}
                    type={item.type}
                    author={item.author}
                    content={item.content}
                    postDate={new Date(item.date_created)}
                    category={item.categories[0].categories_id.name}
                    title={item.title}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>

        {totalPosts / postPerPage > 2 && posts.length >= postPerPage && (
          <Pagination
            total={Math.ceil(totalPosts / postPerPage)}
            truncated
            onChange={changePage}
          />
        )}
      </main>
    </PageWrapper>
  );
}
