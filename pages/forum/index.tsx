import { Container, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import Button from "../../components/buttons/Button";
import TagList from "../../components/buttons/TagList/TagList";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { Hero, Pagination } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../../components/typography";
import ColorSpan from "../../components/typography/ColorSpan/ColorSpan";
import ENDPOINTS from "../../constants/endpoints";
import { FEED_TAGS } from "../../constants/mockData";
import { ForumPostType } from "../../types/forumTypes";
import { titleToSlug } from "../../utils/slugify";

export default function Forum() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<ForumPostType[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const postPerPage = 9;

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);

      try {
        // Get the posts
        const res = await fetch(
          `${ENDPOINTS.COLLECTIONS}/forum_posts?filter[status][_eq]=published`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Get the posts count
        const countRes = await fetch(
          `${ENDPOINTS.COLLECTIONS}/forum_posts?aggregate[count]=*`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = await res.json();
        const { data: countData } = await countRes.json();

        setTotalPosts(countData[0].count);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    if (!isLoading && posts.length === 0) {
      getPost();
    }
  }, [isLoading, posts.length]);

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
                <Button href="/forum/vraag">Stuur je eigen vraag in!</Button>
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
        <Container style={{ marginBottom: 56 }}>
          <Grid container style={{ marginBottom: "32px" }}>
            <Grid item xs={12}>
              <TagList tags={FEED_TAGS} />
            </Grid>
          </Grid>

          <Grid container spacing={"34px"}>
            {isLoading ? (
              <CircleSpinner size={34} color="#fff" />
            ) : (
              posts.map((item, index) => (
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
              ))
            )}
          </Grid>
        </Container>

        {totalPosts / postPerPage > 2 && (
          <Pagination total={Math.ceil(totalPosts / postPerPage)} truncated />
        )}
      </main>
    </PageWrapper>
  );
}
