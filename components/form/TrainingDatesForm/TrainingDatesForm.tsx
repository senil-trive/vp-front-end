import { Grid } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AboutVolunteerType,
  MotivationType,
  TrainingType,
} from "../../../types/forumTypes";
import styled from "styled-components";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import Button from "../../buttons/Button";
import { VOLUNTEERTRAININGDATES } from "../../../constants/volunteer-training-dates";
import { postVolunteerApplication } from "../../../utils/api";

const TrainingDatesForm = ({
  setIsSubmitted,
  className,
  step,
  setStep,
  aboutVolunteer,
  volunteerMotivation,
  paddingSize = "md",
}: {
  aboutVolunteer: AboutVolunteerType;
  volunteerMotivation: MotivationType;
  className?: string;
  paddingSize?: "sm" | "md";
  step: number;
  setIsSubmitted: (params: boolean) => void;
  setStep: (param: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trainingDate, setTrainingDates] = useState("");
  const [acceptTAndC, setAcceptTAndC] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainingType>();

  const submitForm = async (data: TrainingType) => {
    setIsLoading(true);

    try {
      await postVolunteerApplication({
        training_date: trainingDate,
        ...aboutVolunteer,
        ...volunteerMotivation,
      });
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };
  // const [isLoading, setIsLoading] = useState(false);
  // const [trainingDate, setTrainingDates] = useState("");
  // const [acceptTAndC, setAcceptTAndC] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<MotivationType>();

  // const submitForm = async (data: any) => {
  //   // onIsSubmit(data);
  // };

  const onSubmit: SubmitHandler<TrainingType> = async (data) => {
    setIsSubmitted(true);
    submitForm(data);
    console.log(errors);
    if (!errors) {
      setStep(step + 1);
    }
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
    padding: 32px 0px;
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
        margin-left: 8px;
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
        margin-bottom: 6px;
        line-height: 130%;
      }
    }
  `;

  return (
    <div className="relative h-[100%]">
      <StyledForm>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-[100%]">
          <Grid container spacing={"16"} className="form-wrapper">
            {VOLUNTEERTRAININGDATES.map((item) => (
              <Grid item xs={12} className="items-center flex" key={item}>
                <InputCheckbox
                  name="training_date"
                  label={"Basistraining op maandag 20 augustus om 20:00 uur"}
                  checked={trainingDate === item}
                  setChecked={setTrainingDates}
                  onChange={() => setTrainingDates(item)}
                />
              </Grid>
            ))}
            <Grid item xs={12} className="items-center flex">
              <InputCheckbox
                label={
                  "*Ja, ik heb de algemene voorwaarden gelezen en begrepen en accepteer deze.*"
                }
                checked={acceptTAndC}
                name="acceptTAndC"
                onChange={() => setAcceptTAndC(!acceptTAndC)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="infoReversed"
                loading={isLoading}
                //   disabled={isSubmitted}
                className="bg-[#FE517E] w-[100%] text-center text-[#fff] text-[18px] font-[400]"
              >
                aanmelding afronden!
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledForm>
    </div>
  );
};

export default TrainingDatesForm;
