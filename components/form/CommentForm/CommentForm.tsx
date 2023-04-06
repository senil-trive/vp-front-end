import { Container, Grid } from "@mui/material";
import { H3, H4, P } from "../../typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../buttons/Button";
import Dropdown from "../Dropdown/Dropdown";
import { FiCheck } from "react-icons/fi";
import ForumComment from "../../content-types/ForumComment/ForumComment";
import { ForumCommentType } from "../../../types/forumTypes";
import { GENDERS } from "../../../constants/genders";
import Input from "../Input/Input";
import Section from "../../layout/Section/Section";
import TextArea from "../TextArea/TextArea";
import { postComment } from "../../../utils/api";
import { useTheme } from "styled-components";
import { rgba } from "../../../utils/colors";

type Props = {
  type?: "forum" | "blog";
  postId: string;
  comments?: ForumCommentType[];
  preText?: string;
};

const SubmitForm = ({
  type,
  postId,
  replyId,
  isSubmitted,
  onIsSubmit,
}: {
  type: "forum" | "blog";
  postId: string;
  replyId?: string;
  isSubmitted: boolean;
  onIsSubmit: (x: boolean) => void;
}) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

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
      parent_comment: replyId,
    };

    try {
      await postComment(type, body);
      onIsSubmit(true);
    } catch (error) {
      onIsSubmit(false);
    }

    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<ForumCommentType> = async (data) => {
    submitForm(data);
  };

  return (
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
                label="Schrijf hier je vraag of bericht *"
                name="content"
                placeholder="Schrijf hier je vraag of bericht"
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
          <FiCheck size={40} color={colors.secondary.normal} />
          <H3 variant="bold" color="primary">
            Bedankt! Jouw commentaar wordt door ons beoordeeld.
          </H3>
        </div>
      )}
    </Section>
  );
};

export default function CommentForm({
  type = "blog",
  comments = [],
  preText,
  postId,
}: Props) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReply = (id: string) => {
    setReplyId(id);
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
      {comments
        .filter((comment) => !comment.parent_comment)
        .map((comment) => (
          <Grid container key={comment.id}>
            <Grid item xs={0} md={2} lg={2} />
            <Grid item xs={12} md={8} lg={8}>
              <div
                style={{
                  borderBottom: `1px solid ${rgba(colors.primary.normal, 0.2)}`,
                  marginBottom: 34,
                }}
              >
                <ForumComment
                  author={comment.user_name}
                  age={comment.user_age}
                  postDate={new Date(comment.date_created)}
                  title={comment.content}
                  onReply={() => handleReply(comment.id)}
                />

                <div
                  className={
                    replyId === comment.id
                      ? "overflow-hidden max-h-[999px]"
                      : "overflow-hidden max-h-[0px]"
                  }
                >
                  <SubmitForm
                    postId={postId}
                    replyId={comment.id}
                    isSubmitted={isSubmitted}
                    type={type}
                    onIsSubmit={(x) => setIsSubmitted(x)}
                  />
                </div>

                {comment.child_comments
                  ?.filter((comment) => comment.status === "published")
                  .map((child) => (
                    <div key={child.id}>
                      <ForumComment
                        isReplyComment
                        author={child.user_name}
                        age={child.user_age}
                        postDate={new Date(child.date_created)}
                        title={child.content}
                        onReply={() => handleReply(child.id)}
                      />

                      <div
                        className={
                          replyId === child.id
                            ? "overflow-hidden max-h-[999px]"
                            : "overflow-hidden max-h-[0px]"
                        }
                      >
                        <SubmitForm
                          postId={postId}
                          replyId={child.id}
                          isSubmitted={isSubmitted && replyId === child.id}
                          type={type}
                          onIsSubmit={(x) => setIsSubmitted(x)}
                        />
                      </div>
                      {child.child_comments
                        ?.filter((comment) => comment.status === "published")
                        .map((grandChild) => (
                          <div key={grandChild.id}>
                            <ForumComment
                              isReplyComment
                              author={grandChild.user_name}
                              age={grandChild.user_age}
                              postDate={new Date(grandChild.date_created)}
                              title={grandChild.content}
                              onReply={() => handleReply(grandChild.id)}
                            />

                            <div
                              className={
                                replyId === grandChild.id
                                  ? "overflow-hidden max-h-[999px]"
                                  : "overflow-hidden max-h-[0px]"
                              }
                            >
                              <SubmitForm
                                postId={postId}
                                replyId={grandChild.id}
                                isSubmitted={
                                  isSubmitted && replyId === grandChild.id
                                }
                                type={type}
                                onIsSubmit={(x) => setIsSubmitted(x)}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={2} />
          </Grid>
        ))}

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

        <SubmitForm
          postId={postId}
          isSubmitted={isSubmitted}
          type={type}
          onIsSubmit={(x) => setIsSubmitted(x)}
        />
      </div>
    </Container>
  );
}
