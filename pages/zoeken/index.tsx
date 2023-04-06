import { Container, Grid } from "@mui/material";
import { H1, P } from "../../components/typography";
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
    <PageWrapper title="Zoekresultaten">
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1
                variant="bold"
                style={{ textAlign: "center", padding: "0 24px" }}
              >
                {posts.length + forumPosts.length + letters.length} resultaten
                gevonden
              </H1>

              <P variant="light" style={{ textAlign: "center" }}>
                Je hebt gezocht op `{q}`
              </P>

              <div>
                <SearchBar />
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={"22px"}>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                amount={forumPosts.length}
                resultTitleSuffix={<span>in ons Forum</span>}
                list={forumPosts.map((post) => ({
                  name: truncate(post.content, 120),
                  link: `/kinderen/forum/${post.slug}`,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                colorVariant={2}
                amount={posts.length}
                resultTitleSuffix={<span>in Blogs en Vlogs</span>}
                list={posts.map((post) => ({
                  name: post.title,
                  link: `/verhalen/${post.slug}`,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                colorVariant={3}
                amount={letters.length}
                resultTitleSuffix={<span>in Brieven</span>}
                list={letters.map((post) => ({
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
