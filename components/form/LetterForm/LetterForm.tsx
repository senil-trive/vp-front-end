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
import Checkbox from "../Checkbox/Checkbox";

const LetterForm = ({
  className,
  isSubmitted,
  onIsSubmit,
  paddingSize = "md",
}: {
  isSubmitted?: boolean;
  className?: string;
  paddingSize?: "sm" | "md";
  onIsSubmit?: (x: boolean) => void;
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

    try {
      //   onIsSubmit(true);
    } catch (error) {
      //   onIsSubmit(false);
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
      background-position: center center;
      z-index: 1;
    }

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
      position: relative;
      z-index: 2;
      div,
      .selectBox {
        border: none;
      }
    }
  `;
  return (
    <Section
      backgroundColor="white"
      paddingSize={paddingSize}
      className={className}
    >
      <div className="relative">
        <StyledForm>
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
              <Grid item xs={12}>
                <Input
                  label="E-mailadres"
                  type="email"
                  name="user_email"
                  register={register}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Dropdown
                  options={GENDERS}
                  label="Selecteer een taal"
                  name="pdf_language"
                  register={register}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="E-mailadres"
                  type="email"
                  name="user_email"
                  register={register}
                />
              </Grid>
              <Grid item xs={12}>
                <Checkbox label="Ja, ik wil graag maandelijks tips & inspiratie via de mail ontvangen" />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button loading={isLoading} disabled={isSubmitted}>
                  download brief
                </Button>
              </Grid>
            </Grid>
          </form>
        </StyledForm>
      </div>
    </Section>
  );
};

export default LetterForm;
