import { colors, Container, Grid } from "@mui/material";
import { Hero, Pagination } from "../../../components/layout";
import { H4, P, TitleWithHighlights } from "../../../components/typography";
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
import parseImageURL from "../../../utils/parseImageURL";
import ChevronRight from "../../../components/icons/ChevronRight/ChevronRight";
import Image from "next/image";
import Input from "../../../components/form/Input/Input";
import SearchIcon from "../../../components/icons/SearchIcon/SearchIcon";

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
        pageData: pageRes.data || null,
        forumData: forumRes.data || null,
        totalPosts: forumRes.meta?.filter_count || null,
        tags: tagsRes.data || null,
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

  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };

  const handleSearch = (x: any) => {
    console.log(x);
    setSearch(x.target.value);
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
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: pageData?.seo_description
          ? pageData?.seo_description
          : pageData?.page_subtitle,
        canonical: "https://www.villapinedo.nl/kinderen/forum",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <Hero
        center
        imageUrl={
          pageData?.hero_image?.id
            ? parseImageURL(pageData?.hero_image?.id)
            : "/vrijwilligerswerkheader.png"
        }
        style={{
          minHeight: 649,
          position: "relative",
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} md={8} className="w-[100%] mx-auto">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                color="white"
                style={{
                  textAlign: "center",
                  padding: "0 24px",
                  fontSize: "64px",
                  fontWeight: "400",
                }}
              />
              <P
                color="white"
                variant="light"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "300",
                }}
              >
                {pageData?.page_subtitle}
              </P>

              <div style={{ display: "flex", gap: 32 }}>
                <Button
                  href="/kinderen/forum/stel-een-vraag"
                  style={{
                    backgroundColor: "#3FC7B4",
                    fontSize: "18px",
                    fontWeight: "300",
                  }}
                >
                  {pageData?.submit_question_button_label}
                </Button>
                <Button
                  variant="white"
                  filled={false}
                  href="/ik-wil-een-buddy"
                  style={{
                    fontSize: "18px",
                    fontWeight: "300",
                    border: "1px solid #fff",
                  }}
                >
                  {pageData?.chat_button_label}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <div
          style={{
            marginBottom: 32,
            transform: "translateY(calc(-50% - 24px))",
          }}
        >
          <TagList
            tags={tags}
            selected={selectedTag}
            prefix={
              <H4
                style={{
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "5px",
                }}
              >
                Onderwerp{" "}
                <span
                  style={{
                    marginTop: "-6px",
                  }}
                >
                  👉🏾
                </span>
              </H4>
            }
            suffix={<ChevronRight />}
            onSelect={(x: string) => {
              setSelectedTag(x);
            }}
          />
        </div>

        <Container style={{ margin: "56px auto" }}>
          <Grid container spacing={"34px"}>
            <>
              <Grid item xs={12} md={9}>
                <P color="primary">
                  {totalCount} {totalCount === 1 ? "vraag" : "vragen"}
                </P>
              </Grid>
              <Grid item xs={12} md={3}>
                <SortBar sortOptions={forumSortOptions} onSort={handleSort} />
              </Grid>
              <Grid item xs={12} md={8}>
                <div className="flex flex-col h-[100%]">
                  <Image
                    src="/Imageforum.png"
                    alt="forum search"
                    fill
                    className="relative w-[100%] h-[120px]"
                  />
                  <div className="bg-[#FE517E] h-[246px] p-[32px]">
                    <div>
                      <TitleWithHighlights
                        text={"je hoeft het niet alleen te doen"}
                        color="white"
                        className="text-[32px]"
                      />
                      <div className="md:flex md:items-center">
                        <div className="w-[180px] text-[18px] text-[#fff]">
                          Doorzoek het forum:
                        </div>
                        <div className="mt-[20px] flex-1 md:mt-[0px]">
                          <Input
                            iconLeft={<SearchIcon />}
                            defaultValue={search}
                            placeholder={"Zoek in het forum.."}
                            onChange={handleSearch}
                            borderColor="primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              {isLoading ? (
                <CircleSpinner size={34} color="#fff" />
              ) : (
                <>
                  {posts.map((item, index) => (
                    <Grid key={index} item xs={12} md={4}>
                      <Link href={`/kinderen/forum/${item.slug}`}>
                        <ForumPost
                          truncateContent
                          fullHeight={false}
                          gender={item.user_gender}
                          age={item.user_age}
                          image={item.user_image?.id || "asad"}
                          authorType={item.user_name}
                          postDate={new Date(item.date_created)}
                          tags={
                            item.categories?.map(
                              (cat) => cat.categories_id?.name
                            ) ?? []
                          }
                          title={
                            item.title ?? "Titel moet in CMS worden ingevoerd"
                          }
                          comments={item.comments.length}
                          content={item.content}
                        />
                      </Link>
                    </Grid>
                  ))}
                </>
              )}
            </>
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
