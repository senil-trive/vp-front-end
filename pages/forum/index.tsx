import { Container, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "../../components/buttons/Button";
import TagList from "../../components/buttons/TagList/TagList";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { Footer, Header, Hero, Pagination } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../../components/typography";
import ColorSpan from "../../components/typography/ColorSpan/ColorSpan";
import ENDPOINTS from "../../constants/endpoints";
import { FEED_TAGS, FORUM_POSTS } from "../../constants/mockData";
import { titleToSlug } from "../../utils/slugify";

// export const getServerSideProps = async () => {
//   // fetch page data from API

//   try {
//     const req = await fetch(`${ENDPOINTS.COLLECTIONS}/forum_posts?fields=*`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const res = await req.json();

//     console.log(res.data);

//     return {
//       props: {
//         pageData: res.data,
//       },
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       redirect: {
//         destination: "/500",
//       },
//     };
//   }
// };

type Props = {
  pageData: any;
  error?: boolean;
};

export default function Forum({ pageData }: Props) {
  return (
    <PageWrapper title="Forum overzicht">
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
              <Grid key={index} item xs={12} md={4}>
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
    </PageWrapper>
  );
}
