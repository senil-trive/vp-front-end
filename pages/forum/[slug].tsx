import { Container, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { Footer, Header, Hero, Pagination } from "../../components/layout";
import { H1 } from "../../components/typography";
import { FORUM_POSTS } from "../../constants/mockData";
import { slugToTitle } from "../../utils/slugify";

const item = FORUM_POSTS[0];

export default function Forum() {
  const router = useRouter();

  const { slug } = router.query;

  return (
    <div>
      <Head>
        <title>Forum detail - Villa Pinedo</title>
        <meta
          name="description"
          content="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={2} />
            <Grid item xs={12} md={8} lg={8}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                {slugToTitle(slug as string)}
              </H1>
            </Grid>
            <Grid item xs={0} md={2} lg={2} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container>
          <Grid container style={{ marginBottom: "32px" }}>
            <Grid item xs={0} md={2} lg={2} />
            <Grid item xs={12} md={8} lg={8}>
              <ForumPost
                author={item.author}
                age={item.age}
                likes={item.likes}
                authorType={item.authorType}
                postDate={item.postDate}
                tags={item.tags}
                title={item.title}
              />
            </Grid>
            <Grid item xs={0} md={2} lg={2} />
          </Grid>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
