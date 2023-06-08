import { Grid, Hero } from "../../../components/layout";
import { H2, P, TitleWithHighlights } from "../../../components/typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { getContentTags, postForum, uploadFile } from "../../../utils/api";

import Button from "../../../components/buttons/Button";
import { COLORS } from "../../../styles/theme";
import { Container } from "@mui/system";
import { Divider } from "@mui/material";
import Dropdown from "../../../components/form/Dropdown/Dropdown";
import { ForumPostType } from "../../../types/forumTypes";
import { ForumQuestionPageProps } from "../../../types/pageTypes";
import { GENDERS } from "../../../constants/genders";
import Input from "../../../components/form/Input/Input";
import Link from "next/link";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import Section from "../../../components/layout/Section/Section";
import TextArea from "../../../components/form/TextArea/TextArea";
import TextList from "../../../components/typography/TextList/TextList";
import { useState } from "react";
import { slugify } from "../../../utils/url";
import styled from "styled-components";
import parseImageURL from "../../../utils/parseImageURL";

export const getServerSideProps = async () => {
  try {
    const categoriesReq = await getContentTags();
    const categoriesRes = await categoriesReq.json();
    return {
      props: {
        categories: categoriesRes.data ?? [],
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        categories: [],
      },
    };
  }
};

export default function Vraag({ categories }: ForumQuestionPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumPostType>();

  const submitForm: SubmitHandler<ForumPostType> = async (data) => {
    setIsLoading(true);

    const submitData: any = {
      ...data,
      slug: slugify(data.title),
      categories: data?.categories?.map((cat) => ({
        categories_id: cat,
      })),
    };

    try {
      await postForum(submitData);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
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
    <PageWrapper
      seo={{
        title: "Stel een vraag | Villa Pinedo",
        description:
          "Stel je vraag aan de Buddy's en andere kinderen met gescheiden ouders",

        canonical: "https://www.villapinedo.nl/kinderen/forum/stel-een-vraag",
      }}
    >
      <Hero
        center
        imageUrl={parseImageURL(undefined, 2040)}
        //imageUrl="/vrijwilligerswerkheader.png"
        style={{
          minHeight: 649,
          position: "relative",
        }}
      >
        <Grid container style={{ marginBottom: 65 }}>
          <Grid item xs={0} md={2} lg={3} />
          <Grid
            item
            xs={12}
            md={8}
            lg={6}
            className="flex flex-col items-center"
          >
            <TitleWithHighlights
              text="Stel je vraag"
              highlightColor="info"
              style={{
                textAlign: "center",
                fontFamily: "Fjalla One",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "64px",
                lineHeight: "140%",
                color: `white`,
              }}
            />
            <P
              style={{
                textAlign: "center",
                fontFamily: "Avenir",
                fontStyle: "normal",
                fontWeight: `300`,
                fontSize: `18px`,
                lineHeight: `160%`,
                color: `white`,
              }}
            >
              Heb jij een vraag over de scheiding? Stel ‘m hier! De Buddy’s en
              andere kinderen met gescheiden ouders geven jou tips en
              beantwoorden al jouw vragen.
            </P>
            <Button
              variant="infoReversed"
              className="border-white text-white w-96 mt-5"
            >
              Lees hier de vragen van anderen
            </Button>
          </Grid>
          <Grid item xs={0} md={2} lg={3} />
        </Grid>
      </Hero>
      <Container>
        <main>
          <Container
            className="relative"
            style={{
              marginBottom: 32,
              transform: "translateY(-75px)",
            }}
          >
            <StyledForm>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(submitForm)}>
                  <Grid container spacing="33px">
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Voornaam"
                        name="user_name"
                        placeholder="Vul hier je voornaam in"
                        register={register}
                        hasError={!!errors.user_name}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Input
                        label="Leeftijd"
                        type="number"
                        name="user_age"
                        placeholder="Vul hier je leeftijd in"
                        register={register}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Input
                        label="Email adres"
                        type="email"
                        placeholder="Vul hier je email in"
                        name="user_email"
                        register={register}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Dropdown
                        options={GENDERS}
                        label="Geslacht"
                        placeholder="Maak een keuze"
                        name="user_gender"
                        register={register}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Woonplaats"
                        type="text"
                        placeholder="Vul hier je woonplaats in"
                        name="user_location"
                        register={register}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Dropdown
                        label="Wat houdt je bezig?"
                        placeholder="Maak een keuze"
                        name="categories"
                        register={register}
                        multi
                        options={categories.map((item) => ({
                          name: item.name,
                          value: item.id,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        label="Schrijf hier je vraag of bericht *"
                        name="content"
                        placeholder="Schrijf hier je vraag of bericht"
                        required
                        register={register}
                        hasError={!!errors.content}
                        maxLength={1500}
                        helperText={
                          !!errors.content ? "Dit veld is verplicht" : ""
                        }
                      />
                    </Grid>

                    {/* <Grid item xs={12}>
                        <P variant="light">* Verplichte velden</P>
                      </Grid> */}
                    <Grid item xs={12} md={12}>
                      <Button
                        className="bg-white text-orange-700 font-normal w-full"
                        loading={isLoading}
                      >
                        {isLoading && "bezig..."}
                        {isSubmitted && "Verzonden"}
                        {!isLoading &&
                          !isSubmitted &&
                          "ja, ik wil mijn vraag plaatsen"}
                      </Button>
                    </Grid>

                    {/* <div className="py-[30px]">
                        <Divider variant="middle" className="my-[48px]" />
                        <Container>
                          <P>Houd je aan de volgende regels:</P>
                          <TextList ordered>
                            <li className=" mb-2">
                              Behandel elkaar met respect: Geen persoonlijke
                              aanvallen, geen gevloek, neem elkaar serieus.
                            </li>
                            <li className=" mb-2">
                              Geef alleen je voornaam of een fictieve naam op.
                              Post nooit persoonlijke gegevens zoals je mobiele
                              telefoonnummer of je (e-mail) adres.
                            </li>
                            <li className=" mb-2">
                              Dating, bedreiging, discriminatie en seksuele
                              intimidatie zijn absoluut verboden. Let op: Onder
                              dating valt elke vorm van contact en het
                              uitwisselen van gegevens.
                            </li>
                            <li className=" mb-2">
                              Op het forum mag geen reclame gemaakt worden, dus
                              ook niet voor je eigen websites. Je mag geen
                              aanstootgevende plaatjes/filmpjes posten of dingen
                              proberen te verkopen.
                            </li>
                            <li className=" mb-2">
                              Schrijf leesbaar en post niet twee keer hetzelfde
                              forumbericht of dezelfde reactie.
                            </li>
                            <li className=" mb-2">
                              Villa Pinedo monitort alle berichten die worden
                              geplaatst op het forum voordat deze daadwerkelijk
                              op het forum verschijnen.
                            </li>
                            <li className=" mb-2">
                              Villa Pinedo heeft het recht ongepaste berichten
                              en/of berichten die in strijd zijn met de algemene
                              voorwaarden te verwijderen van het forum.
                            </li>
                            <li className=" mb-2">
                              Villa Pinedo mag dit bericht delen op haar andere
                              online kanalen en in offline uitingen, zolang de
                              schrijver maar anoniem blijft en zolang dit onze
                              missie ondersteunt om ouders bewust te maken.
                            </li>
                            <li className=" mb-2">
                              Wij spelen jouw gegevens niet door aan anderen en
                              volgen hierbij onze privacyverklaring en
                              bewaartermijnen beleid.
                            </li>
                          </TextList>
                        </Container>
                      </div> */}
                  </Grid>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16 mx-auto">
                  <H2 variant="bold">Bedankt voor het stellen van je vraag!</H2>
                  <P>
                    Bedankt voor het stellen van je vraag! Binnen twee dagen
                    krijg je antwoord met tips en advies en komen je vraag en de
                    antwoorden op de website te staan. Je krijgt hierover een
                    mail zodat je niet steeds zelf hoeft te checken of je vraag
                    en antwoorden al online staan. Heb jij tips voor andere
                    kinderen van gescheiden ouders?{" "}
                    <Link
                      style={{
                        textDecoration: "underline",
                        color: COLORS.primary.normal,
                      }}
                      href={"/kinderen/forum"}
                    >
                      Klik dan hier.
                    </Link>
                  </P>
                  <P>
                    Heb je meer vragen over de scheiding van je ouders en wil je
                    liever voor langere tijd met iemand chatten?{" "}
                    <Link
                      style={{
                        textDecoration: "underline",
                        color: COLORS.primary.normal,
                      }}
                      href={"/kinderen/ik-wil-een-buddy"}
                    >
                      Vraag dan een buddy aan.
                    </Link>{" "}
                    Een Buddy is iemand, die net als jij, ook gescheiden ouders
                    heeft.
                  </P>
                </div>
              )}
            </StyledForm>
          </Container>
        </main>
      </Container>
    </PageWrapper>
  );
}
