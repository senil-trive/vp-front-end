import { Container, Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/buttons/Button";
import ForumComment from "../../components/content-types/ForumComment/ForumComment";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import Dropdown from "../../components/form/Dropdown/Dropdown";
import Input from "../../components/form/Input/Input";
import TextArea from "../../components/form/TextArea/TextArea";
import { Hero } from "../../components/layout";
import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Section from "../../components/layout/Section/Section";
import { H2, H4, P } from "../../components/typography";
import ENDPOINTS from "../../constants/endpoints";
import { GENDERS } from "../../constants/genders";
import { ForumCommentType, ForumPostType } from "../../types/forumTypes";
import { postComment } from "../../utils/api";
import { slugToTitle, titleToSlug } from "../../utils/url";

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

    console.log(data);
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
    console.log(error);
    return {
      props: {
        slug: "Not Found",
        pageData: null,
      },
    };
  }
};

export default function ForumDetail({ slug, pageData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumCommentType>();

  const submitForm = async (data: any) => {
    setIsLoading(true);

    const body = {
      ...data,
      post_id: pageData.id,
    };

    try {
      await postComment("forum", body);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<ForumCommentType> = async (data) => {
    submitForm(data);
  };

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
              authorType={"Anonamous"}
              postDate={new Date(pageData.date_created)}
              tags={[]}
              title={pageData.content}
            />
          </Grid>
          <Grid item xs={0} md={2} lg={2} />
        </Grid>
      </Container>

      <main style={{ marginBottom: "80px" }}>
        <Container>
          <Grid container style={{ margin: "70px 0" }}>
            <Grid item xs={0} md={2} lg={2} />
            <Grid item xs={12} md={8} lg={8}>
              <H4 variant="bold">Reacties ({pageData.comments.length})</H4>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container>
            {pageData?.comments.map((comment) => (
              <>
                <Grid item xs={0} md={2} lg={2} />
                <Grid item xs={12} md={8} lg={8}>
                  <ForumComment
                    author={comment.user_name}
                    age={comment.user_age}
                    authorType={"Anonamous"}
                    postDate={new Date(comment.date_created)}
                    title={comment.content}
                  />
                </Grid>
                <Grid item xs={0} md={2} lg={2} />
              </>
            ))}
          </Grid>
        </Container>
        <Hero center>
          <Container>
            <Section>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing="33px">
                  <Grid item xs={12} md={6}>
                    <Input
                      label="Voornaam"
                      name="user_name"
                      register={register}
                      hasError={!!errors.user_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      label="Leeftijd"
                      type="number"
                      name="user_age"
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      label="Email adres"
                      type="email"
                      name="user_email"
                      register={register}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Dropdown
                      options={GENDERS}
                      label="Geslacht"
                      name="user_gender"
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <Input
                label="Upload bestand"
                type="file"
                name="attachment_image"
                register={register}
              /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <TextArea
                      label="Bericht *"
                      name="content"
                      required
                      register={register}
                      hasError={!!errors.content}
                      helperText={
                        !!errors.content ? "Dit veld is verplicht" : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <P variant="light">* Verplichte velden</P>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button loading={isLoading} disabled={isSubmitted}>
                      {isLoading && "bezig..."}
                      {isSubmitted && "Verzonden"}
                      {!isLoading && !isSubmitted && "Vraag insturen"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Section>
          </Container>
        </Hero>
      </main>
    </PageWrapper>
  );
}
