import { Grid } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../buttons/Button";
import Dropdown from "../Dropdown/Dropdown";
import { AboutVolunteerType } from "../../../types/forumTypes";
import Input from "../Input/Input";
import styled from "styled-components";
import { GENDERS } from "../../../constants/genders";
import { KNOWABOUTUSFROM } from "../../../constants/know-aboutus-from";

const AboutVolunteerForm = ({
  className,
  step,
  setStep,
  //   isSubmitted,
  //   onIsSubmit,
  paddingSize = "md",
}: {
  //   isSubmitted?: boolean;
  className?: string;
  paddingSize?: "sm" | "md";
  //   onIsSubmit: (x: any) => void;
  step: number;
  setStep: (params: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [knowFrom, setKnowFrom] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutVolunteerType>();

  const submitForm = async (data: any) => {
    console.log(data);
    // onIsSubmit(data);
  };

  const onSubmit: SubmitHandler<AboutVolunteerType> = async (data) => {
    const checkboxtipsins: HTMLInputElement | null = document.getElementById(
      "input-check"
    ) as HTMLInputElement;
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
        color: #000 !important;
        font-size: 18px;
        font-weight: 800;
        line-height: 160%;
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
            <Grid item xs={12} md={4}>
              <Input
                label="Wat zijn je initialen?"
                name="your_initials"
                required
                register={register}
                hasError={!!errors.your_initials}
                placeholder="Jouw initialen"
                helperText={
                  !!errors.your_initials ? "initialen is verplicht" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Wat is je voornaam?"
                required
                name="first_name"
                placeholder="Jouw voornaam..."
                register={register}
                hasError={!!errors.first_name}
                helperText={!!errors?.first_name ? "voornaam is verplicht" : ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Wat is je achternaam?"
                required
                name="surname"
                placeholder="Jouw achternaam..."
                hasError={!!errors.surname}
                register={register}
                helperText={!!errors?.surname ? "achternaam is verplicht" : ""}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Dropdown
                options={GENDERS}
                required
                label="Wat is je geslacht?"
                placeholder="Jouw geslacht..."
                name="gender"
                hasError={!!errors.gender}
                register={register}
                helperText={
                  !!errors?.gender ? "selecteer alstublieft één geslacht" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                type="date"
                required
                label="Wat is je geboortedatum?"
                name="birth_date"
                placeholder="Jouw leeftijd... (18-25)"
                register={register}
                hasError={!!errors.birth_date}
                helperText={
                  !!errors.birth_date ? "geboortedatum is verplicht" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Wat is je e-mailadres"
                name="email_address"
                required
                hasError={!!errors.email_address}
                register={register}
                placeholder="Jouw e-mailadres..."
                helperText={
                  !!errors.email_address ? "e-mailadres is verplicht" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Waar woon je?"
                name="address"
                required
                placeholder="Jouw woonplaats..."
                register={register}
                hasError={!!errors.address}
                helperText={!!errors.address ? "adres is verplicht" : ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Telefoonnummer"
                name="phone_number"
                required
                placeholder="Jouw telefoonnummer..."
                register={register}
                hasError={!!errors.phone_number}
                helperText={
                  !!errors.phone_number ? "telefoonnummer is verplicht" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Dropdown
                options={KNOWABOUTUSFROM}
                required
                label="Hoe ken je ons?"
                name="know_about_us"
                register={register}
                placeholder="selecteer..."
                helperText={
                  !!errors?.know_about_us
                    ? "selecteer alstublieft een optie"
                    : ""
                }
                hasError={!!errors.know_about_us}
                onChange={(e) => setKnowFrom(e)}
              />
            </Grid>
            {knowFrom === "Anderen" && (
              <Grid item xs={12} md={4}>
                <Input
                  label="weet van?"
                  name="other_reference_from"
                  required
                  hasError={!!errors.know_from}
                  register={register}
                  placeholder="weet van..."
                  helperText={!!errors.know_from ? "weet van is verplicht" : ""}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                loading={isLoading}
                variant="infoReversed"
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

export default AboutVolunteerForm;
