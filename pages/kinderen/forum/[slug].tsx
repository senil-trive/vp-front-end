import { Container, Grid } from "@mui/material";
import { ForumCommentType, ForumPostType } from "../../../types/forumTypes";
import { H2, H4, P } from "../../../components/typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { slugToTitle, titleToSlug } from "../../../utils/url";

import BreadCrumbs from "../../../components/layout/BreadCrumbs/BreadCrumbs";
import Button from "../../../components/buttons/Button";
import CommentForm from "../../../components/form/CommentForm/CommentForm";
import Dropdown from "../../../components/form/Dropdown/Dropdown";
import ENDPOINTS from "../../../constants/endpoints";
import ForumComment from "../../../components/content-types/ForumComment/ForumComment";
import ForumPost from "../../../components/content-types/ForumPost/ForumPost";
import { GENDERS } from "../../../constants/genders";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../../components/layout";
import Input from "../../../components/form/Input/Input";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import Section from "../../../components/layout/Section/Section";
import TextArea from "../../../components/form/TextArea/TextArea";
import { postComment } from "../../../utils/api";

type Props = {
  pageData: ForumPostType;
  slug: string;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug: id } = ctx.query;

  try {
    // Get the posts
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=*.*&filter[id][_eq]=${id}`,
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
        slug: titleToSlug(data[0].content),
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

export default function ForumDetail({ slug, pageData }: Props) {
  return (
    <PageWrapper title={slugToTitle(slug as string)}>
      <BreadCrumbs />
      <Container>
        <Grid container>
          <Grid item xs={0} md={2} lg={2} />
          <Grid item xs={12} md={8} lg={8}>
            <ForumPost
              author={pageData.user_name}
              age={pageData.user_age}
              likes={Number(pageData.likes)}
              authorType={"Anonymous"}
              postDate={new Date(pageData.date_created)}
              tags={[]}
              title={pageData.content}
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
