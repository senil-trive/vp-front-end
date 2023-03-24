import { Container, Grid } from "@mui/material";
import { P, TitleWithHighlights } from "../../../components/typography";
import { Hero, Pagination } from "../../../components/layout";
import React, { useEffect, useState } from "react";
import {
  getContentTags,
  getForumOverviewPageData,
  getForumPosts,
} from "../../../utils/api";

import Button from "../../../components/buttons/Button";
import { CircleSpinner } from "react-spinners-kit";
import CollectionSearchBar from "../../../components/form/CollectionSearchBar/CollectionSearchBar";
import { ForumPageProps } from "../../../types/pageTypes";
import ForumPost from "../../../components/content-types/ForumPost/ForumPost";
import Link from "next/link";
import { POST_PER_PAGE } from "../../../constants/app-configs";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import SortBar from "../../../components/form/SortBar/SortBar";
import TagList from "../../../components/buttons/TagList/TagList";

const forumSortOptions = [
  { name: "Titel (a-z)", value: "content" },
  { name: "Titel (z-a)", value: "-content" },
  { name: "Auteur (a-z)", value: "user_name" },
  { name: "Auteur (z-a)", value: "-user_name" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

export const getServerSideProps = async () => {
  try {
    const pageReq = await getForumOverviewPageData();
    const tagsReq = await getContentTags();
    const forumReq = await getForumPosts({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    const forumRes = await forumReq.json();
    const tagsRes = await tagsReq.json();

    return {
      props: {
        pageData: pageRes.data,
        forumData: forumRes.data,
        totalPosts: forumRes.meta.filter_count,
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
  forumData,
  totalPosts,
  tags,
}: ForumPageProps) {
  const [posts, setPosts] = useState(forumData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  console.log(posts);

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
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter[categories][categories_id][id][_eq]=${selectedTag}`
              : ``,
        });
        const res = await req.json();

        setPosts(res.data ?? []);
        setTotalCount(res?.meta?.filter_count || 0);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    getPaginatedPost();
  }, [currentPage, search, sort, selectedTag]);

  return (
    <PageWrapper title="Forum overzicht">
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                style={{ textAlign: "center", padding: "0 24px" }}
              />
              <P variant="light" className="text-center">
                {pageData?.page_subtitle}
              </P>

              <div style={{ display: "flex", gap: 32 }}>
                <Button href="/kinderen/forum/stel-een-vraag">
                  {pageData?.submit_question_button_label}
                </Button>
                <Button filled={false} href="/kinderen/klets-met-een-buddy">
                  {pageData?.chat_button_label}
                </Button>
              </div>
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
            setSelectedTag(x);
          }}
        />

        <CollectionSearchBar onSearch={handleSearch} />

        <Container style={{ margin: "56px auto" }}>
          <Grid container spacing={"34px"}>
            {isLoading ? (
              <CircleSpinner size={34} color="#fff" />
            ) : (
              <>
                <Grid item xs={12} md={9}>
                  <P color="primary">
                    {totalCount} {totalCount === 1 ? "vraag" : "vragen"}
                  </P>
                </Grid>
                <Grid item xs={12} md={3}>
                  <SortBar sortOptions={forumSortOptions} onSort={handleSort} />
                </Grid>
                {posts.map((item, index) => (
                  <Grid key={index} item xs={12} md={4}>
                    <Link href={`/kinderen/forum/${item.slug}`}>
                      <ForumPost
                        truncateContent
                        fullHeight={false}
                        gender={item.user_gender}
                        age={item.user_age}
                        likes={Number(item.likes)}
                        authorType={item.user_name}
                        postDate={new Date(item.date_created)}
                        tags={
                          item.categories?.map(
                            (cat) => cat.categories_id.name
                          ) ?? []
                        }
                        title={
                          item.title ?? "Titel moet in CMS worden ingevoerd"
                        }
                        content={item.content}
                      />
                    </Link>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>

        {totalCount / POST_PER_PAGE > 2 && (
          <Pagination
            total={Math.ceil(totalCount / POST_PER_PAGE)}
            truncated
            onChange={changePage}
          />
        )}
      </main>
    </PageWrapper>
  );
}
