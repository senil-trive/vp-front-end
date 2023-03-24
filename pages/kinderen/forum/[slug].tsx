import { Container, Grid } from "@mui/material";

import BreadCrumbs from "../../../components/layout/BreadCrumbs/BreadCrumbs";
import CommentForm from "../../../components/form/CommentForm/CommentForm";
import ENDPOINTS from "../../../constants/endpoints";
import ForumPost from "../../../components/content-types/ForumPost/ForumPost";
import { ForumPostType } from "../../../types/forumTypes";
import { GetServerSidePropsContext } from "next";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import React from "react";

type Props = {
  pageData: ForumPostType;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the posts
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=*.*.*&filter[slug][_eq]=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await res.json();

    if (!data[0]) {
      return {
        redirect: "/forum",
        permanent: false,
      };
    }

    return {
      props: {
        pageData: data[0] ?? null,
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

export default function ForumDetail({ pageData }: Props) {
  return (
    <PageWrapper title={pageData.slug}>
      <BreadCrumbs />
      <Container>
        <Grid container>
          <Grid item xs={0} md={2} lg={2} />
          <Grid item xs={12} md={8} lg={8}>
            <ForumPost
              gender={pageData.user_gender}
              age={pageData.user_age}
              likes={Number(pageData.likes)}
              authorType={pageData.user_name}
              postDate={new Date(pageData.date_created)}
              truncateContent={false}
              tags={
                pageData.categories?.map((cat) => cat.categories_id.name) ?? []
              }
              title={pageData.title ?? "Titel moet in CMS worden ingevoerd"}
              content={pageData.content}
              fullHeight={false}
            />
          </Grid>
          <Grid item xs={0} md={2} lg={2} />
        </Grid>
      </Container>

      <main style={{ marginBottom: "80px" }}>
        <CommentForm
          type="forum"
          comments={pageData.comments}
          preText="De Buddy’s beantwoorden alle vragen. Zij zaten in eenzelfde situatie
          als jij en hebben dus heel veel wijze raad. Maar niet alleen
          Budd's weten hoe het voelt om gescheiden ouders te hebben, jij
          ook! Heb jij een goede tip? Deel 'm hieronder!"
          postId={pageData.id}
        />
      </main>
    </PageWrapper>
  );
}
