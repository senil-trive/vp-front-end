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
import parseImageURL from "../../../utils/parseImageURL";
import { postVolunteerApplication } from "../../../utils/api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TrainigenHeroWrapper } from "../../../styles/Vrjwilligerswerk/TrainigenWrapper.styles";
import { HeroBannerWrapper } from "../../../styles/global.styled";

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
        seo={{
          title: pageData?.seo_title
            ? pageData?.seo_title
            : pageData?.page_title,
          description: pageData?.seo_description
            ? pageData?.seo_description
            : pageData?.page_subtitle,
          canonical:
            "https://www.villapinedo.nl/vrijwilligerswerk/buddy-programma",
          image: pageData?.seo_image
            ? parseImageURL(pageData?.seo_image?.id)
            : "",
        }}
      >
        <main className="mai">
          <TrainigenHeroWrapper>
            <Hero
              center
              imageUrl={"/signupheader.png"}
              style={{
                minHeight: 555,
                position: "relative",
              }}
              mobileImageHeight={564}
            >
              <HeroBannerWrapper>
                <div className="title-wrap max-w-2xl md:max-w-4xl">
                  <TitleWithHighlights
                    headerElement="h1"
                    color="white"
                    highlightColor="info"
                    text={pageData?.page_title}
                    className="title"
                  />
                  <P className="subtitle">{pageData?.page_subtitle}</P>
                </div>
              </HeroBannerWrapper>
            </Hero>
          </TrainigenHeroWrapper>
          <Container className="mb-[80px] mt-[-120px] relative md:mb-[120px] max-w-[1118px]">
            <Section className="py-[32px] px-[32px]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(submitForm)}>
                  <Grid container spacing="33px">
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Voornaam*"
                        required
                        name="first_name"
                        placeholder="Vul hier je voornaam in"
                        register={register}
                        hasError={!!errors.first_name}
                        helperText={errors.first_name && "Vul je voornaam in"}
                        labelClass="aanmelden-form-label"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Achternaam*"
                        required
                        name="last_name"
                        placeholder="Vul hier je achternaam in"
                        register={register}
                        hasError={!!errors.last_name}
                        helperText={errors.last_name && "Vul je achternaam in"}
                        labelClass="aanmelden-form-label"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Dropdown
                        options={GENDERS}
                        label="Geslacht"
                        name="gender"
                        register={register}
                        placeholder="Maak een keuze"
                        required
                        hasError={!!errors.gender}
                        helperText={errors.gender && "Maak een keuze"}
                        labelClass="aanmelden-form-label"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Geboortedatum*"
                        type="date"
                        required
                        name="birthdate"
                        register={register}
                        hasError={!!errors.birthdate}
                        helperText={
                          errors.birthdate && "Vul je geboortedatum in"
                        }
                        labelClass="aanmelden-form-label"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Email adres*"
                        type="email"
                        required
                        name="email"
                        placeholder="Vul hier je email adres in"
                        register={register}
                        hasError={!!errors.email}
                        helperText={errors.email && "Vul je e-mail adres in"}
                        labelClass="aanmelden-form-label"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Woonplaats*"
                        type="text"
                        required
                        name="city"
                        placeholder="Vul hier je woonplaats in"
                        register={register}
                        hasError={!!errors.city}
                        helperText={errors.city && "Vul je woonplaats in"}
                        labelClass="aanmelden-form-label"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      {/* <Grid item xs={12}>
                        <P variant="light" style={{ color: "#fff" }}>
                          * Verplichte velden
                        </P>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Button
                          loading={isLoading}
                          disabled={isSubmitted}
                          className="w-[100] bg-[#fff] text-[#FF971D] text-[18px] font-[400]"
                        >
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
