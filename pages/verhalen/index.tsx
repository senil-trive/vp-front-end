import { CircularProgress, Container, Grid } from "@mui/material";
import { H4, P, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useState } from "react";
import {
  getContentTags,
  getPostOverviewPageData,
  getPosts,
} from "../../utils/api";

import { BlogPageProps } from "../../types/pageTypes";
import CollectionSearchBar from "../../components/form/CollectionSearchBar/CollectionSearchBar";
import { Hero, Pagination } from "../../components/layout";
import { MasonryGrid } from "../../components/layout/MasonryGrid/MasonryGrid";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SortBar from "../../components/form/SortBar/SortBar";
import TagList from "../../components/buttons/TagList/TagList";
import parseImageURL from "../../utils/parseImageURL";
import { useCallbackWhenReachedBottom } from "../../utils/scroll";
import { useTheme } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import ChevronRight from "../../components/icons/ChevronRight/ChevronRight";
import SearchIcon from "../../components/icons/SearchIcon/SearchIcon";
import Input from "../../components/form/Input/Input";

export const getServerSideProps = async () => {
  try {
    const pageReq = await getPostOverviewPageData();
    const tagsReq = await getContentTags();
    const blogsReq = await getPosts({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    console.log(pageRes, "Ddddf");
    const blogRes = await blogsReq.json();
    const tagsRes = await tagsReq.json();
    return {
      props: {
        pageData: pageRes.data || null,
        blogsData: blogRes.data || null,
        totalPosts: blogRes.meta.filter_count || null,
        tags: tagsRes.data || null,
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

  // useCallbackWhenReachedBottom(async () => {
  //   if (posts.length < totalCount) {
  //     setIsLoading(true);
  //     try {
  //       const req = await getPosts({
  //         postPerPage: POST_PER_PAGE,
  //         page: currentPage + 1,
  //         search,
  //         sort,
  //         meta: "filter_count",
  //         filter:
  //           selectedTag.length > 0
  //             ? `filter={"categories": { "categories_id": { "id": { "_eq": "${selectedTag}"}}}}`
  //             : ``,
  //       });
  //       const res = await req.json();

  //       setPosts([...posts, ...(res.data || [])]);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   } else {
  //     setIsEnd(true);
  //   }
  // });

  const handleSearch = (x: string) => {
    console.log("hereeee", x);
    setSearch(x);
    setCurrentPage(1);
  };

  const handleSort = (x: string) => {
    setSort(x);
  };
  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };
  useEffect(() => {
    const getPaginatedBlogs = async () => {
      console.log("hereeee", search);
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
        console.log(res);
        setPosts(res.data || []);
        setTotalCount(res.meta.filter_count || 0);
      } catch (error) {
        console.log(error);
      }
    };

    getPaginatedBlogs();
  }, [search, sort, selectedTag]);

  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: pageData?.seo_description
          ? pageData?.seo_description
          : pageData?.page_subtitle,
        canonical: "https://www.villapinedo.nl/verhalen",
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
        mbgn={"/Header_Banner.png"}
        mobileImageHeight={740}
      >
        <Container>
          <Grid container className="custom_banner_content">
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                style={{
                  textAlign: "center",
                  padding: "0 24px",
                  fontSize: "64px",
                  fontWeight: "400",
                }}
                color="white"
              />
              <P
                color="white"
                variant="light"
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: "300",
                }}
              >
                {pageData?.page_subtitle}
              </P>
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  justifyContent: "space-between",
                }}
                className="custom_banner_form"
              >
                <P style={{ color: "#fff", fontSize: "18px" }}>
                  Doorzoek de blogs / vlogs
                </P>
                <div style={{ width: "60%" }} className="custom_banner_formBox">
                  <Input
                    iconLeft={<SearchIcon color={"#fff"} />}
                    placeholder={pageData?.search_bar_quote}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "0px" }}>
        <div
          style={{
            marginBottom: -40,
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
              if (x === selectedTag) {
                setSelectedTag("");
              } else {
                setSelectedTag(x);
              }
            }}
          />
        </div>
        {/* 
        <CollectionSearchBar
          quote={pageData?.search_bar_quote ?? ""}
          onSearch={handleSearch}
          searchLabel="Doorzoek de verhalen"
        /> */}

        <div style={{ margin: "0px auto" }}>
          <Container style={{ marginBottom: "0px", maxWidth: "100%" }}>
            <Grid container>
              <Grid item xs={12} md={9}>
                <P style={{ color: colors.black.normal, fontSize: "24px" }}>
                  {totalCount} verhalen
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
              width: 3,
              content: item,
            }))}
          />
        </div>

        <div className="flex items-center justify-center">
          {/* {isLoading && <CircularProgress size={"30px"} />} */}
          {isEnd && (
            <P style={{ marginLeft: "1rem" }} color="info">
              Geen posts meer om te tonen
            </P>
          )}
        </div>
        {totalCount / POST_PER_PAGE > 2 && (
          <div style={{ paddingBottom: "128px" }}>
            <Pagination
              total={Math.ceil(totalCount / POST_PER_PAGE)}
              truncated
              onChange={changePage}
            />
          </div>
        )}
      </main>
    </PageWrapper>
  );
}
