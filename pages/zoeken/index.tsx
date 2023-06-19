import { Container, Grid } from "@mui/material";
import { H4, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useRef, useState } from "react";
import { getForumPosts, getLetters, getPosts } from "../../utils/api";
import { BlogType } from "../../types/content-types/Blog.type";
import { ForumPostType } from "../../types/forumTypes";
import { Hero } from "../../components/layout";
import { Letter } from "../../types/content-types/Letter.type";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SearchResultItem from "../../components/content-types/SearchResultItem/SearchResultItem";
import { truncate } from "../../utils/truncate";
import { useRouter } from "next/router";
import parseImageURL from "../../utils/parseImageURL";
import TextWithHighlights from "../../components/typography/TextWithHighlights";
import SearchBarWrapper from "../../components/form/SearchBar/SearchBarWrapper";
import {
  ContainerWrapper,
  HeroBannerWrapper,
} from "../../styles/global.styled";

export default function Search() {
  const router = useRouter();

  const brievenRef = useRef(null);
  const blogRef = useRef(null);
  const forumRef = useRef(null);

  const [posts, setPosts] = useState<BlogType[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPostType[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const { q } = router.query;

  useEffect(() => {
    const getPaginatedBlogs = async () => {
      try {
        const req = await getPosts({
          postPerPage: POST_PER_PAGE,
          search: q as string,
        });
        const res = await req.json();

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getPaginatedForum = async () => {
      try {
        const req = await getForumPosts({
          postPerPage: POST_PER_PAGE,
          search: q as string,
        });
        const res = await req.json();

        setForumPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getPaginatedLetters = async () => {
      try {
        const req = await getLetters({
          postPerPage: POST_PER_PAGE,
          search: q as string,
        });
        const res = await req.json();

        setLetters(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (router.isReady) {
      getPaginatedBlogs();
      getPaginatedForum();
      getPaginatedLetters();
    }
  }, [q, router.isReady]);

  return (
    <PageWrapper
      seo={{
        title: "Zoeken",
        description: "Zoek hier naar blogs, forum posts en brieven.",
        canonical: "https://www.villapinedo.nl/zoeken",
      }}
    >
      <Hero
        imageUrl={parseImageURL(undefined, 1080)}
        center
        style={{
          minHeight: 548,
          position: "relative",
        }}
      >
        <HeroBannerWrapper className="zoeken-page">
          <div className="title-wrap max-w-4xl">
            <TitleWithHighlights
              text={`${
                posts?.length + forumPosts?.length + letters?.length
              } resultaten gevonden`}
              color="white"
              className="title"
            />
            <TextWithHighlights
              color="white"
              variant="light"
              text={`Je hebt gezocht op "${q}"`}
              textToHighlight={{ word: `"${q}"`, color: "#3FC7B4" }}
              className="subtitle"
            />
          </div>
        </HeroBannerWrapper>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <div
          style={{
            marginBottom: 32,
            transform: "translateY(calc(-50% - 24px))",
          }}
        >
          <ContainerWrapper className="lg-container px-[0]">
            <SearchBarWrapper
              prefix={
                <H4 className="text-[24px] font-[400] leading-[120%]">
                  Gebruik een ander zoekwoord 👉🏾
                </H4>
              }
            />
          </ContainerWrapper>
        </div>
        <ContainerWrapper className="lg-container">
          <Grid container spacing={"22px"}>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                amount={forumPosts?.length}
                resultTitleSuffix={` in ons Forum`}
                list={forumPosts?.map((post) => ({
                  name: truncate(post.content, 120),
                  link: `/kinderen/forum/${post.slug}`,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                colorVariant={2}
                amount={posts?.length}
                resultTitleSuffix={` in Blogs en Vlogs`}
                list={posts?.map((post) => ({
                  name: post.title,
                  link: `/verhalen/${post.slug}`,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                colorVariant={3}
                amount={letters?.length}
                resultTitleSuffix={` in Brieven`}
                list={letters?.map((post) => ({
                  name: post.title,
                  link: `/verhalen/${post.slug}`,
                }))}
              />
            </Grid>
          </Grid>
        </ContainerWrapper>
      </main>
    </PageWrapper>
  );
}
