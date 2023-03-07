import { Container, Grid } from "@mui/material";
import { H2, P, TitleWithHighlights } from "../../../components/typography";

import Button from "../../../components/buttons/Button";
import Dropdown from "../../../components/form/Dropdown/Dropdown";
import ENDPOINTS from "../../../constants/endpoints";
import { GENDERS } from "../../../constants/genders";
import { Hero } from "../../../components/layout";
import Input from "../../../components/form/Input/Input";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import Section from "../../../components/layout/Section/Section";
import { VolunteerRequestType } from "../../../types/volunteerRequestTypes";
import { postVolunteerApplication } from "../../../utils/api";
import { useForm } from "react-hook-form";
import { useState } from "react";

type VolunteersSignupPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/volunteer_signup_page?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();

    if (!pageRes?.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pageData: pageRes.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

const VolunteersFAQPage: React.FC<VolunteersSignupPageProps> = ({
  pageData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerRequestType>();

  const submitForm = async (data: VolunteerRequestType) => {
    setIsLoading(true);

    try {
      await postVolunteerApplication(data);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <PageWrapper
        title={pageData?.page_title}
        description={pageData?.page_subtitle}
      >
        <main>
          <Hero>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                headerElement="h1"
                color="primary"
                highlightColor="info"
                text={pageData?.page_title}
                textToHighlight={pageData?.page_title_highlighted}
              />
              <P>{pageData?.page_subtitle}</P>
            </div>
          </Hero>

          <Container className="mb-10">
            <Section>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(submitForm)}>
                  <Grid container spacing="33px">
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Voornaam*"
                        required
                        name="first_name"
                        register={register}
                        hasError={!!errors.first_name}
                        helperText={errors.first_name && "Vul je voornaam in"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Achternaam*"
                        required
                        name="last_name"
                        register={register}
                        hasError={!!errors.last_name}
                        helperText={errors.last_name && "Vul je achternaam in"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Dropdown
                        options={GENDERS}
                        label="Geslacht"
                        name="gender"
                        register={register}
                        required
                        hasError={!!errors.gender}
                        helperText={errors.gender && "Maak een keuze"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Geboortedatum*"
                        type="date"
                        required
                        name="birthdate"
                        register={register}
                        helperText={
                          errors.birthdate && "Vul je geboortedatum in"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Email adres*"
                        type="email"
                        required
                        name="email"
                        register={register}
                        helperText={errors.email && "Vul je e-mail adres in"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Woonplaats*"
                        type="text"
                        required
                        name="city"
                        register={register}
                        helperText={errors.birthdate && "Vul je woonplaats in"}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Grid item xs={12}>
                        <P variant="light">* Verplichte velden</P>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Button loading={isLoading} disabled={isSubmitted}>
                          {isLoading && "Bezig..."}
                          {isSubmitted && "Verzonden"}
                          {!isLoading && !isSubmitted && "Versturen"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16 mx-auto">
                  <H2 variant="bold">Bedankt voor je aanmelding!</H2>
                  <P>We nemen zo snel mogelijk contact met je op.</P>
                </div>
              )}
            </Section>
          </Container>
        </main>
      </PageWrapper>
    </div>
  );
};

export default VolunteersFAQPage;
