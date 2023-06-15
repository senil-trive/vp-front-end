import { Container, Grid } from "@mui/material";
import { H1, H4, P, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useState } from "react";
import { getForumPosts, getLetters, getPosts } from "../../utils/api";

import { BlogType } from "../../types/content-types/Blog.type";
import { ForumPostType } from "../../types/forumTypes";
import { Hero } from "../../components/layout";
import { Letter } from "../../types/content-types/Letter.type";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SearchBar from "../../components/form/SearchBar/SearchBar";
import SearchResultItem from "../../components/content-types/SearchResultItem/SearchResultItem";
import { truncate } from "../../utils/truncate";
import { useRouter } from "next/router";
import parseImageURL from "../../utils/parseImageURL";
import TextWithHighlights from "../../components/typography/TextWithHighlights";
import SearchBarWrapper from "../../components/form/SearchBar/SearchBarWrapper";

export default function Search() {
  const router = useRouter();
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
        imageUrl={parseImageURL("874097af-edba-4bac-81b3-53cfcf5c7797")}
        center
        style={{
          minHeight: 649,
          position: "relative",
        }}
      >
        <Container>
          <Grid container>
            {/* <Grid item xs={0} md={2} lg={3} /> */}
            <Grid item xs={12} md={8} lg={12}>
              <div className="text-center">
                <TitleWithHighlights
                  text={`${
                    posts?.length + forumPosts?.length + letters?.length
                  } resultaten gevonden`}
                  color="white"
                  style={{
                    // textAlign: "center",
                    fontFamily: "Fjalla One",
                    fontStyle: `normal`,
                    fontWeight: `400`,
                    fontSize: `80px`,
                    lineHeight: `118%`,
                    marginBottom: `50px`,
                  }}
                />
                <TextWithHighlights
                  color="white"
                  variant="light"
                  style={{
                    fontFamily: "Avenir",
                    fontStyle: `normal`,
                    fontWeight: `500`,
                    fontSize: `28px`,
                    lineHeight: `120.5%`,
                  }}
                  text={`Je hebt gezocht op "${q}"`}
                  textToHighlight={{ word: `"${q}"`, color: "#3FC7B4" }}
                />
              </div>
            </Grid>
            {/* <Grid item xs={0} md={2} lg={3} /> */}
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
          <SearchBarWrapper prefix={<H4>Gebruik een ander zoekwoord 👉🏾</H4>} />
        </div>
        <Container maxWidth="xl">
          <Grid container spacing={"22px"}>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                amount={forumPosts?.length}
                resultTitleSuffix={` in ons Forum`}
                list={forumPosts?.map((post) => ({
                  name: truncate(post.content, 120),
                  link: `/forum/${post.slug}`,
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
        </Container>
      </main>
    </PageWrapper>
  );
}
