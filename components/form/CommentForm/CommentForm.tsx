import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import { useTheme } from "styled-components";
import { GENDERS } from "../../../constants/genders";
import { ForumCommentType } from "../../../types/forumTypes";
import { postComment } from "../../../utils/api";
import Button from "../../buttons/Button";
import ForumComment from "../../content-types/ForumComment/ForumComment";
import Section from "../../layout/Section/Section";
import { H3, H4, P } from "../../typography";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";

type Props = {
  type?: "forum" | "blog";
  postId: string;
  comments?: ForumCommentType[];
  preText?: string;
};

export default function CommentForm({
  type = "blog",
  comments = [],
  preText,
  postId,
}: Props) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
      post_id: postId,
    };

    try {
      await postComment(type, body);
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
    <Container>
      <Grid container style={{ margin: "70px 0" }}>
        <Grid item xs={0} md={2} lg={2} />
        <Grid item xs={12} md={8} lg={8}>
          <H4 variant="bold" color="tertiary">
            Reacties ({comments.length})
          </H4>
        </Grid>
      </Grid>
      <Grid container>
        {comments.map((comment) => (
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

      {!isSubmitted && (
        <Grid
          container
          direction="column"
          justifyItems="center"
          alignItems="center"
          className="mb-[32px]"
        >
          <Grid item xs={4}>
            <Button onClick={() => setIsOpen((open) => !open)}>
              Commentaar toevoegen
            </Button>
          </Grid>
        </Grid>
      )}

      <div
        className={
          isOpen
            ? "overflow-hidden max-h-[999px]"
            : "overflow-hidden max-h-[0px]"
        }
      >
        {!!preText && (
          <div className="my-20 text-center max-w-2xl mx-auto">
            <P>{preText}</P>
          </div>
        )}
        <Section>
          {!isSubmitted ? (
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
                    helperText={!!errors.content ? "Dit veld is verplicht" : ""}
                  />
                </Grid>

                <Grid item xs={12}>
                  <P variant="light">* Verplichte velden</P>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button loading={isLoading} disabled={isSubmitted}>
                    {isLoading && "bezig..."}
                    {isSubmitted && "Verzonden"}
                    {!isLoading && !isSubmitted && "Commentaar plaatsen"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FiCheck size={40} color={colors.secondary} />
              <H3 variant="bold" color="primary">
                Bedankt! Jouw commentaar wordt door ons beoordeeld.
              </H3>
            </div>
          )}
        </Section>
      </div>
    </Container>
  );
}
