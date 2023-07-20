import { Grid } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MotivationType } from "../../../types/forumTypes";
import TextArea from "../TextArea/TextArea";
import styled from "styled-components";
import Button from "../../buttons/Button";

const MotivationForm = ({
  className,
  // isSubmitted,
  step,
  setStep,
  // onIsSubmit,
  paddingSize = "md",
}: {
  isSubmitted?: boolean;
  className?: string;
  paddingSize?: "sm" | "md";
  // onIsSubmit: (x: any) => void;
  step: number;
  setStep: (params: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MotivationType>();

  const submitForm = async (data: any) => {
    // onIsSubmit(data);
  };

  const onSubmit: SubmitHandler<MotivationType> = async (data) => {
    const checkboxtipsins: HTMLInputElement | null = document.getElementById(
      "input-check"
    ) as HTMLInputElement;
    // data.tips_inspiration_email = checkboxtipsins?.checked;
    submitForm(data);

    setStep(step + 1);
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
      // background-size: cover;
      // background-repeat: no-repeat;
      /* background-position: center center; */
      background-size: 59%;
      background-position: left 225px top -75px;
      z-index: 1;
    }
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 8px;
    padding: 32px 0;

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
      label {
        color: #000;
        font-size: 18px;
        font-weight: 800;
      }
    }
    @media (max-width: 768px) {
      &:before {
        background-size: 135%;
        background-position: left -108px top 8px;
      }
      form > div > div {
        padding: 14px 0 !important;
      }
      .form-wrapper {
        margin: auto !important;
        width: inherit;
      }
      label {
        margin-bottom: 14px;
        line-height: 130%;
      }
    }
  `;
  return (
    <div className="relative h-[100%]">
      <StyledForm>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-[100%]">
          <Grid container spacing={"16"} className="form-wrapper">
            <Grid item xs={12}>
              <TextArea
                label="waarom wil je vrijwilliger worden bij Villa Pinedo? Waarom spreekt het jou aan en past het bij jou?"
                name="volunteeratvillapinedo"
                placeholder="Jouw antwoord..."
                required
                register={register}
                hasError={!!errors.volunteeratvillapinedo}
                helperText={
                  !!errors.volunteeratvillapinedo ? "Dit veld is verplicht" : ""
                }
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Hoe heb je de scheiding van je ouders beleefd? Wat zijn jouw ervaringen?"
                name="yourexperiences"
                placeholder="Jouw antwoord..."
                required
                register={register}
                hasError={!!errors.yourexperiences}
                helperText={
                  !!errors.yourexperiences ? "Dit veld is verplicht" : ""
                }
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Waarom is het juist nu de tijd voor jou om je in te zetten als vrijwilliger voor kinderen met gescheiden ouders?"
                name="volunteerforchildren"
                placeholder="Jouw antwoord..."
                required
                register={register}
                hasError={!!errors.volunteerforchildren}
                helperText={
                  !!errors.volunteerforchildren ? "Dit veld is verplicht" : ""
                }
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="infoReversed"
                loading={isLoading}
                //   disabled={isSubmitted}
                className="bg-[#FE517E] w-[100%] text-center text-[#fff] text-[18px] font-[400]"
              >
                volgende
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledForm>
    </div>
  );
};

export default MotivationForm;
