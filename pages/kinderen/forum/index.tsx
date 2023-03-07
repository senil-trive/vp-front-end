import { Container, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";
import Button from "../../../components/buttons/Button";
import TagList from "../../../components/buttons/TagList/TagList";
import ForumPost from "../../../components/content-types/ForumPost/ForumPost";
import CollectionSearchBar from "../../../components/form/CollectionSearchBar/CollectionSearchBar";
import SortBar from "../../../components/form/SortBar/SortBar";
import { Hero, Pagination } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../../../components/typography";
import ColorSpan from "../../../components/typography/ColorSpan/ColorSpan";
import { POST_PER_PAGE } from "../../../constants/app-configs";
import ENDPOINTS from "../../../constants/endpoints";
import { FEED_TAGS } from "../../../constants/mockData";
import { ForumPostType } from "../../../types/forumTypes";
import { ForumPageProps } from "../../../types/pageTypes";
import {
  getForumOverviewPageData,
  getForumPosts,
  getForumTotal,
} from "../../../utils/api";

const forumSortOptions = [
  { name: "Titel (a-z)", value: "content" },
  { name: "Titel (z-a)", value: "-content" },
  { name: "Autheur (a-z)", value: "user_name" },
  { name: "Autheur (z-a)", value: "-user_name" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

export const getServerSideProps = async () => {
  try {
    const pageReq = await getForumOverviewPageData();
    const forumReq = await getForumPosts({ postPerPage: POST_PER_PAGE });
    const countReq = await getForumTotal();

    const pageRes = await pageReq.json();
    const forumRes = await forumReq.json();
    const countRes = await countReq.json();

    return {
      props: {
        pageData: pageRes.data,
        forumData: forumRes.data,
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
  forumData,
  totalPosts,
}: ForumPageProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<ForumPostType[]>(forumData);
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
    const getPaginatedPost = async () => {
      setIsLoading(true);
      try {
        const req = await getForumPosts({
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

      setIsLoading(false);
    };

    getPaginatedPost();
  }, [currentPage, search, sort]);

  return (
    <PageWrapper title="Forum overzicht">
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                {pageData?.page_title}
              </H1>
              <P variant="light">{pageData?.page_subtitle}</P>

              <div style={{ display: "flex", gap: 32 }}>
                <Button href="/forum/vraag">
                  {pageData?.submit_question_button_label}
                </Button>
                <Button filled={false} onClick={() => console.log("clicked")}>
                  {pageData?.chat_button_label}
                </Button>
              </div>
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

        <CollectionSearchBar onSearch={handleSearch} />

        <Container style={{ margin: "56px auto" }}>
          <Grid container spacing={"34px"}>
            {isLoading ? (
              <CircleSpinner size={34} color="#fff" />
            ) : (
              <>
                <Grid item xs={12} md={9}>
                  <P style={{ color: colors.primary }}>
                    {search ? posts.length : totalPosts} forum post
                  </P>
                </Grid>
                <Grid item xs={12} md={3}>
                  <SortBar sortOptions={forumSortOptions} onSort={handleSort} />
                </Grid>
                {posts.map((item, index) => (
                  <Grid key={index} item xs={12} md={4}>
                    <Link href={`forum/${item.id}`}>
                      <ForumPost
                        author={item.user_name}
                        age={item.user_age}
                        likes={Number(item.likes)}
                        authorType={"Anonamous"}
                        postDate={new Date(item.date_created)}
                        tags={[]}
                        title={item.content}
                      />
                    </Link>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>

        {totalPosts / POST_PER_PAGE > 2 && (
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
