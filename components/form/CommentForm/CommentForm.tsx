import { Container, Grid } from "@mui/material";
import { H3, H2, P } from "../../typography";
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
import styled, { useTheme } from "styled-components";
import { rgba } from "../../../utils/colors";

type Props = {
  type?: "forum" | "blog" | "open_letter";
  postId: string;
  comments?: ForumCommentType[];
  preText?: string;
  parent?: string;
};

const SubmitForm = ({
  type,
  postId,
  replyId,
  isSubmitted,
  onIsSubmit,
  paddingSize = "md",
}: {
  type: "forum" | "blog" | "open_letter";
  postId: string;
  replyId?: string;
  isSubmitted: boolean;
  paddingSize?: "sm" | "md";
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
    const body = { ...data, post_id: postId, parent_comment: replyId };
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
  const StyledForm = styled.div`
    &:before {
      content: " ";
      display: block;
      position: absolute;
      left: 0;
      top: 0px;
      width: 100%;
      height: 100%;
      opacity: 0.25;
      background: url("/chatBg.png");
      // background-size: cover;
      // background-repeat: no-repeat;
      /* background-position: center center; */
      z-index: 1;
      background-size: 59%;
      background-position: left 225px top -75px;
    }
    display: flex;
    height: 100%;
    background-color: rgba(255, 151, 29, 1);
    border-radius: 8px;
    padding: 32px;

    label {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      color: white;
    }

    form {
      height: 100%;
      position: relative;
      z-index: 2;
      div,
      .selectBox {
        border: none;
      }
    }
    @media (max-width: 768px) {
      padding: 24px !important;
      &:before {
        background-size: 135%;
        background-position: left -108px top 8px;
      }
      form > div > div {
        padding: 14px !important;
      }
      .form-wrapper {
        margin: auto !important;
        width: inherit;
      }
      label {
        margin-bottom: 6px;
        line-height: 130%;
      }
    }
  `;

  return (
    <div className="relative h-[100%] z-10">
      <StyledForm>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={"33"} className="form-wrapper">
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label="Voornaam"
                  name="user_name"
                  register={register}
                  hasError={!!errors.user_name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label="Leeftijd"
                  type="number"
                  name="user_age"
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label="Email adres"
                  type="email"
                  name="user_email"
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input
                  label="Woonplaats"
                  name="residence"
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Dropdown
                  options={GENDERS}
                  label="Geslacht"
                  name="user_gender"
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Input label="Thema" name="theme" />
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
                <Button
                  loading={isLoading}
                  disabled={isSubmitted}
                  className="bg-[#fff] text-[#FF971D]"
                >
                  {isLoading && "bezig..."}
                  {isSubmitted && "Verzonden"}
                  {!isLoading && !isSubmitted && "Reactie plaatsen"}
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <H3 variant="bold" color="white">
              Bedankt! Jouw reactie wordt door ons beoordeeld.
            </H3>
          </div>
        )}
      </StyledForm>
    </div>
  );
};

export default function CommentForm({
  type = "blog",
  comments = [],
  preText,
  postId,
  parent,
}: Props) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReply = (id: string) => {
    setReplyId(id);
  };
  return (
    <Container className="max-w-[1118px]">
      {!parent ? (
        <>
          <Grid container style={{ margin: "70px 0" }}>
            <Grid item xs={12} md={8} lg={8}>
              <H2 className="text-[35px] md:text-[42px]">
                Reacties ({comments.length})
              </H2>
            </Grid>
          </Grid>
          {comments
            .filter((comment) => !comment.parent_comment)
            .map((comment) => (
              <Grid container key={comment.id}>
                <Grid item xs={12}>
                  <div
                    style={{
                      borderBottom: `1px solid ${rgba(
                        colors.primary.normal,
                        0.2
                      )}`,
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
                        paddingSize="sm"
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
                        <div key={child.id} className="pl-3">
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
                              paddingSize="sm"
                              postId={postId}
                              replyId={child.id}
                              isSubmitted={isSubmitted && replyId === child.id}
                              type={type}
                              onIsSubmit={(x) => setIsSubmitted(x)}
                            />
                          </div>
                          {child.child_comments
                            ?.filter(
                              (comment) => comment.status === "published"
                            )
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
                                    paddingSize="sm"
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
              </Grid>
            ))}
        </>
      ) : (
        <div>
          <div>
            <H3
              variant="bold"
              className="text-[36px] font-[400] mb-[20px] md:mb-[32px] md:text-[42px]"
            >
              {parent}
            </H3>
          </div>
          <SubmitForm
            postId={postId}
            isSubmitted={isSubmitted}
            type={type}
            onIsSubmit={(x) => setIsSubmitted(x)}
          />
        </div>
      )}
    </Container>
  );
}
