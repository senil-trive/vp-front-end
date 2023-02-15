import { Container, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "../../components/buttons/Button";
import TagList from "../../components/buttons/TagList/TagList";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { Footer, Header, Hero, Pagination } from "../../components/layout";
import { H1, P } from "../../components/typography";
import ColorSpan from "../../components/typography/ColorSpan/ColorSpan";
import { FEED_TAGS, FORUM_POSTS } from "../../constants/mockData";
import { titleToSlug } from "../../utils/slugify";

export default function Forum() {
  return (
    <div>
      <Head>
        <title>Forum overzicht - Villa Pinedo</title>
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
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                Leeg je hoofd,
                <ColorSpan variant="info">lucht je hart</ColorSpan>
              </H1>
              <P variant="light">
                Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn
                kan hieronder op het forum of 1 op 1 met een Buddy. Onze Buddy’s
                zaten in dezelfde situatie als jij en hebben dus heel veel wijze
                raad voor je.
              </P>

              <div style={{ display: "flex", gap: 32 }}>
                <Button onClick={() => console.log("clicked")}>
                  Stuur je eigen vraag in!
                </Button>
                <Button filled={false} onClick={() => console.log("clicked")}>
                  Chat met een buddy
                </Button>
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container>
          <Grid container style={{ marginBottom: "32px" }}>
            <Grid item xs={12}>
              <TagList tags={FEED_TAGS} />
            </Grid>
          </Grid>

          <Grid container spacing={"34px"}>
            {FORUM_POSTS.map((item, index) => (
              <Grid key={index} item md={4}>
                <Link href={`forum/${titleToSlug(item.title)}`}>
                  <ForumPost
                    author={item.author}
                    age={item.age}
                    likes={item.likes}
                    authorType={item.authorType}
                    postDate={item.postDate}
                    tags={item.tags}
                    title={item.title}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Pagination total={10} truncated />
      </main>

      <Footer />
    </div>
  );
}
