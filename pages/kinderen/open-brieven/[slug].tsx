import { H3, P, TitleWithHighlights } from "../../../components/typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BreadCrumbs from "../../../components/layout/BreadCrumbs/BreadCrumbs";
import BriefItem from "../../../components/content-types/BriefItem/BriefItem";
import Button from "../../../components/buttons/Button";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import { FiCheck } from "react-icons/fi";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../../components/layout";
import Input from "../../../components/form/Input/Input";
import { Letter } from "../../../types/content-types/Letter.type";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import { parseFileURL } from "../../../utils/parseFileURL";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import parseImageURL from "../../../utils/parseImageURL";
import { postLetterSubscription } from "../../../utils/api";
import { useTheme } from "styled-components";

type Props = {
  pageData: Letter;
  relatedLetters: Letter[];
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the letters
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?filter[slug][_eq]=${slug}&fields=*.*&`,
      {
        method: "GET",
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

    if (!data?.[0]) {
      return {
        notFound: true,
      };
    }

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

  const watchFields = watch(["user_name", "user_city"]);

  const downloadFile = () => {
    window.open(parseFileURL(pageData.downloadable_document?.id), "_blank");
  };

  const submitForm = async (data: any) => {
    setIsLoading(true);

    if (pageData?.requires_signup) {
      try {
        const body = {
          user_name: data?.user_name,
          user_city: data?.user_city,
          letter: {
            id: pageData.id,
          },
        };
        await postLetterSubscription(body);
        setIsSubmitted(true);

        // download downloadable document
        if (pageData?.downloadable_document?.id) {
          downloadFile();
        }
      } catch (error) {
        console.log(error);
        setIsSubmitted(false);
      }
    } else {
      setIsSubmitted(true);

      // download downloadable document
      if (pageData?.downloadable_document?.id) {
        downloadFile();
      }
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
            <div className="mb-8">
              {pageData?.content && parseHTMLtoReact(pageData?.content)}
            </div>
          </div>
        </Hero>

        <section>
          {pageData?.requires_signup ? (
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
                      label="Voornaam"
                      name="user_name"
                      register={register}
                      hasError={!!errors.user_name}
                    />

                    <Input
                      label="Woonplaats"
                      placeholder="Vul je woonplaats in"
                      type="text"
                      name="user_city"
                      register={register}
                    />

                    <P className="text-center">
                      Wij vragen je voornaam en woonplaats zodat wij kunnen zien
                      in welke gemeenten de brief het meest wordt gedownload. Je
                      gegevens worden niet gedeeld met anderen.
                    </P>

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
                    <FiCheck size={40} color={theme.colors.secondary.normal} />
                    <H3 variant="bold" color="primary">
                      Bedankt! De brief wordt nu gedownload.
                    </H3>
                  </div>
                )}
              </div>
            </Container>
          ) : (
            <Container>
              <div className="flex flex-col items-center justify-center ">
                <H3 variant="bold" color="primary">
                  Download de brief
                </H3>

                <Button
                  style={{
                    maxWidth: "30rem",
                    margin: "2rem auto",
                  }}
                  loading={isLoading}
                  onClick={() => submitForm(null)}
                >
                  Downloaden
                </Button>
              </div>
            </Container>
          )}
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
                  fileSrc={`/kinderen/open-brieven/${letter.slug}`}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </PageWrapper>
  );
}
