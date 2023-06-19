import { Container, Grid } from "@mui/material";

import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import CommentForm from "../../components/form/CommentForm/CommentForm";
import ENDPOINTS from "../../constants/endpoints";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { ForumCommentType, ForumPostType } from "../../types/forumTypes";
import { GetServerSidePropsContext } from "next";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import { getComments } from "../../utils/api";
import Image from "next/image";

type Props = {
  pageData: ForumPostType;
  comments: ForumCommentType[];
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the posts
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=categories.*.*,*&filter[slug][_eq]=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await res.json();
    console.log(data);
    if (!data[0]) {
      return {
        redirect: "/forum",
        permanent: false,
      };
    }
    const commentReq = await getComments("forum", data[0].id);
    const commmentRes = await commentReq.json();

    return {
      props: {
        pageData: data[0] ?? null,
        comments: commmentRes.data ?? null,
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

export default function ForumDetail({ pageData, comments = [] }: Props) {
  return (
    <PageWrapper
      seo={{
        title: pageData.title,
        description:
          pageData.content.length > 160 ? pageData.content.slice(0, 160) : "",
        canonical: `https://www.villapinedo.nl/forum/${pageData.slug}`,
        og: {
          type: "article",
          article: {
            publishedTime: pageData.date_created,
            modifiedTime: pageData.date_updated,
            authors: [pageData.user_name],
            tags: pageData.categories?.map((cat) => cat.categories_id.name),
          },
        },
      }}
    >
      <BreadCrumbs />
      <Container>
        <Grid container>
          {/* <Grid item xs={0} md={2} lg={2} /> */}
          <Grid item xs={12} className="mx-auto">
            <ForumPost
              gender={pageData.user_gender}
              age={pageData.user_age}
              authorType={pageData.user_name}
              postDate={new Date(pageData.date_created)}
              truncateContent={false}
              tags={
                pageData.categories?.map((cat) => cat.categories_id.name) ?? []
              }
              title={pageData.title ?? "Titel moet in CMS worden ingevoerd"}
              content={pageData.content}
              comments={comments.length}
              fullHeight={false}
              image={pageData.attachment_image}
            />
          </Grid>
          {/* <Grid item xs={0} md={2} lg={2} /> */}
        </Grid>
      </Container>

      <main>
        <CommentForm
          type="forum"
          comments={comments}
          preText="De Buddy’s beantwoorden alle vragen. Zij zaten in eenzelfde situatie
          als jij en hebben dus heel veel wijze raad. Maar niet alleen
          Budd's weten hoe het voelt om gescheiden ouders te hebben, jij
          ook! Heb jij een goede tip? Deel 'm hieronder!"
          postId={pageData.id}
        />
        <section>
          <div className="my-[40px] md:my-[80px]">
            <CommentForm
              postId={pageData.id}
              parent={"Geef zelf antwoord op deze vraag"}
              type="forum"
            />
          </div>
          <div className="relative">
            <Image
              src="/forumbothead.png"
              alt="respond to letter"
              fill
              className="relative h-[768px] mt-[-600px] md:h-[549px] md:mt-[-300px]"
            />
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
