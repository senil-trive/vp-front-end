import { Container, Grid } from "@mui/material";
import { H3, H2, P } from "../../typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../buttons/Button";
import Dropdown from "../Dropdown/Dropdown";
import { FiCheck } from "react-icons/fi";
import ForumComment from "../../content-types/ForumComment/ForumComment";
import {
  ForumCommentType,
  LetterDownloadType,
} from "../../../types/forumTypes";
import { GENDERS } from "../../../constants/genders";
import Input from "../Input/Input";
import Section from "../../layout/Section/Section";
import TextArea from "../TextArea/TextArea";
import { postComment } from "../../../utils/api";
import styled, { useTheme } from "styled-components";
import { rgba } from "../../../utils/colors";
import Checkbox from "../Checkbox/Checkbox";
import Image from "next/image";
import { LANGUAGES } from "../../../constants/language";

const LetterForm = ({
  className,
  isSubmitted,
  onIsSubmit,
  paddingSize = "md",
}: {
  isSubmitted?: boolean;
  className?: string;
  paddingSize?: "sm" | "md";
  onIsSubmit: (x: any) => void;
}) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [check, setCheck] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LetterDownloadType>();

  const submitForm = async (data: any) => {
    onIsSubmit(data);
  };

  const onSubmit: SubmitHandler<LetterDownloadType> = async (data) => {
    const checkboxtipsins: HTMLInputElement | null = document.getElementById(
      "input-check"
    ) as HTMLInputElement;
    data.tips_inspiration_email = checkboxtipsins?.checked;
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
    display: flex;
    flex-direction: column;
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
      position: relative;
      z-index: 2;
      div,
      .selectBox {
        border: none;
      }
    }
  `;
  console.log(errors);
  return (
    <Section
      backgroundColor="white"
      paddingSize={paddingSize}
      className={className}
    >
      <div className="relative h-[100%]">
        <StyledForm>
          <div className="item-center mt-3 mb-5">
            <H2 style={{ color: "#fff", margin: "0px", fontSize: "32px" }}>
              De hele brief downloaden?
              <Image
                src={"/note.svg"}
                width={40}
                height={40}
                alt={"Heading icon"}
                objectFit="contain"
                className="pl-1 inline float-right absolute"
              />
            </H2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex h-[100%]">
            <Grid container spacing="33px">
              <Grid item xs={12} md={6}>
                <Input
                  label="Voornaam"
                  name="user_name"
                  required
                  register={register}
                  hasError={!!errors.user_name}
                  helperText={!!errors.user_name ? "voornaam is verplicht" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  label="E-mailadres"
                  required
                  type="email"
                  name="user_email"
                  register={register}
                  helperText={
                    !!errors?.user_email ? "e-mailadres is verplicht" : ""
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Dropdown
                  options={LANGUAGES}
                  required
                  label="Selecteer een taal"
                  name="pdf_language"
                  register={register}
                  helperText={
                    !!errors?.pdf_language
                      ? "selecteer alstublieft één taal"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  type="number"
                  required
                  label="Postcode"
                  name="post_code"
                  register={register}
                  helperText={!!errors.post_code ? "postcode is verplicht" : ""}
                />
              </Grid>
              <Grid item xs={12} className="items-center flex">
                <input
                  id="input-check"
                  type="checkbox"
                  name="tips_insipiration_email"
                  className="bg-transparent mx-1 w-[40px] md:w-[20px] h-[20px]"
                />
                <label>
                  Ja, ik wil graag maandelijks tips & inspiratie via de mail
                  ontvangen
                </label>
              </Grid>
              <Grid item xs={12}>
                <Button
                  loading={isLoading}
                  disabled={isSubmitted}
                  className="bg-[#fff] w-[100%] text-center text-[#ff971d] text-[18px] font-[400]"
                >
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
