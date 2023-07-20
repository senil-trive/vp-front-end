import React, { useState } from "react";
import { H3, P } from "../../typography";
import Button from "../../buttons/Button";
import AboutVolunteerForm from "../../form/AboutVolunteerForm/AboutVolunteerForm";
import MotivationForm from "../../form/MotivationForm";
import TrainingDatesForm from "../../form/TrainingDatesForm/TrainingDatesForm";

const SignupStepperForm = ({ stepTitle, children }: any) => {
  const [step, setStep] = useState(1);
  const currentActiveForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex justify-between">
              <H3>Wie ben jij</H3>
              <H3>{step + "/" + 3}</H3>
            </div>
            <AboutVolunteerForm step={step} setStep={setStep} />
          </>
        );
      case 2:
        return (
          <>
            <div>
              <div className="flex justify-between">
                <H3 className="text-[32px]">motivatie</H3>
                <H3>{step + "/" + 3}</H3>
              </div>
              <P>Beantwoordt deze 3 korte vragen in een paar zinnen:</P>
            </div>
            <MotivationForm step={step} setStep={setStep} />
          </>
        );
      case 3:
        return (
          <>
            <div>
              <div className="flex justify-between">
                <H3 className="text-[32px]">Trainingsdata</H3>
                <H3>{step + "/" + 3}</H3>
              </div>
              <P>Ik ben aanwezig op deze trainingen (één kiezen):</P>
            </div>
            <TrainingDatesForm step={step} setStep={setStep} />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className="bg-[#FFECF1] p-[32px] mt-[-120px] max-w-[912px] mx-auto relative rounded-[5px]">
      {currentActiveForm()}
    </div>
  );
};

export default SignupStepperForm;
