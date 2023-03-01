import {
  H2,
  H3,
  H4,
  P,
  TitleWithHighlights,
} from "../../components/typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import Button from "../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../constants/endpoints";
import { FiCheck } from "react-icons/fi";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../components/layout";
import Input from "../../components/form/Input/Input";
import { Letter } from "../../types/content-types/Letter.type";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { parseFileURL } from "../../utils/parseFileURL";
import parseHTMLtoReact from "../../utils/parseHTMLtoReact";
import parseImageURL from "../../utils/parseImageURL";
import { postLetterSubscription } from "../../utils/api";
import { useTheme } from "styled-components";

type Props = {
  pageData: Letter;
  relatedLetters: Letter[];
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug: id } = ctx.query;

  try {
    // Get the letters
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*&filter[slug][_eq]=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const lettersReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await res.json();
    const { data: letters } = await lettersReq.json();

    // shuffle letters
    const randomizedLetters = letters
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return {
      props: {
        pageData: data[0] ?? null,
        relatedLetters: randomizedLetters,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function LetterDetail({ pageData, relatedLetters }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const watchFields = watch(["user_name", "user_email"]);

  const submitForm = async (data: any) => {
    setIsLoading(true);

    try {
      const body = {
        user_email: data.user_email,
        user_name: data.user_name,
        subscribed_to_newsletter: data.subscribe_to_newsletter,
        letter: {
          id: pageData.id,
        },
      };
      await postLetterSubscription(body);
      setIsSubmitted(true);

      // download downloadable document
      if (pageData?.downloadable_document?.id) {
        window.open(parseFileURL(pageData.downloadable_document?.id), "_blank");
      }
    } catch (error) {
      console.log(error);
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    submitForm(data);
  };

  return (
    <PageWrapper title={pageData.title}>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <Hero>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
            <TitleWithHighlights
              highlightColor="info"
              text={pageData?.detail_title}
              textToHighlight={pageData?.detail_title_highlighted}
              headerElement="h1"
              color="primary"
            />
            <div className="mb-8">{parseHTMLtoReact(pageData?.content)}</div>
          </div>
        </Hero>

        <section>
          <Container>
            <div className="flex flex-col items-center justify-center my-20">
              <H3 variant="bold" color="primary">
                De hele brief downloaden?
              </H3>
              <P>Vertel ons hoe je heet en hij komt naar je toe!</P>
            </div>

            <div className="bg-blue-100 p-12 rounded-lg max-w-[850px] mx-auto">
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-10"
                >
                  <Input
                    placeholder="Vul je naam in"
                    label="Naam"
                    name="user_name"
                    register={register}
                    hasError={!!errors.user_name}
                  />

                  <Input
                    label="Email adres"
                    placeholder="Vul je email adres in"
                    type="email"
                    name="user_email"
                    register={register}
                  />

                  <label className={`flex gap-4`}>
                    <input
                      type="checkbox"
                      {...register("subscribe_to_newsletter")}
                    />
                    <span style={{ color: theme.colors.primary }}>
                      Ja, ik wil graag maandelijks tips & inspiratie via de mail
                      ontvangen
                    </span>
                  </label>

                  <Button
                    loading={isLoading}
                    disabled={
                      watchFields[0]?.length === 0 ||
                      watchFields[1]?.length === 0
                    }
                  >
                    Verzenden
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FiCheck size={40} color={theme.colors.secondary} />
                  <H3 variant="bold" color="primary">
                    Bedankt! De brief wordt nu gedownload.
                  </H3>
                </div>
              )}
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="flex flex-col items-center justify-center my-[100px]">
              <H3 variant="bold" color="primary" style={{ margin: 0 }}>
                Meer open brieven
              </H3>
            </div>
          </Container>
          <Container maxWidth="xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
              {relatedLetters.map((letter: Letter) => (
                <BriefItem
                  key={letter.id}
                  title={letter.title}
                  titleHighlighted={letter.title_highlighted}
                  content={letter.description}
                  imgSrc={parseImageURL(letter.image?.id)}
                  fileSrc={`/open-brieven/${letter.slug}`}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </PageWrapper>
  );
}
