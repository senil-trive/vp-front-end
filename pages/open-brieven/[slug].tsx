import { H3, P, TitleWithHighlights } from "../../components/typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import Button from "../../components/buttons/Button";
import { Container, Grid } from "@mui/material";
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
import { getComments, postLetterSubscription } from "../../utils/api";
import { useTheme } from "styled-components";
import LetterForm from "../../components/form/LetterForm/LetterForm";
import { LetterDownloadType } from "../../types/forumTypes";
import CommentForm from "../../components/form/CommentForm/CommentForm";
import Image from "next/image";

type Props = {
  pageData: Letter;
  relatedLetters: Letter[];
  pageoverview: any;
  comments: any;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    const pageoverviewReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/letters_overview_page?fields=highlighted_letter.*,*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pageoverviewRes = await pageoverviewReq.json();
    // Get the letters
    // ${ENDPOINTS.COLLECTIONS}/open_letters?filter[slug][_eq]=${slug}&fields=*.*&
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?filter[slug][_eq]=${slug}&fields=*&`,
      {
        method: "GET",
      }
    );
    // ${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published
    const lettersReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/open_letters?fields=letter_submissions.*,*&filter[status][_eq]=published`,
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
    const commentReq = await getComments("open_letter", data[0].id);
    const commmentRes = await commentReq.json();
    // shuffle letters
    const randomizedLetters = letters
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return {
      props: {
        pageoverview: pageoverviewRes.data,
        pageData: data[0] ?? null,
        relatedLetters: randomizedLetters,
        comments: commmentRes.data ?? null,
      },
    };
  } catch (error) {
    return {
      // redirect: {
      //   destination: "/500",
      // },
    };
  }
};

export default function LetterDetail({
  pageoverview,
  pageData,
  relatedLetters,
  comments,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<LetterDownloadType>();
  const downloadFile = () => {
    window.open(parseFileURL(pageData.downloadable_document), "_blank");
  };
  const submitForm = async (data: any) => {
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

        // download downloadable document
        if (pageData?.downloadable_document) {
          downloadFile();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // download downloadable document
      if (pageData?.downloadable_document) {
        downloadFile();
      }
    }
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    submitForm(data);
  };

  return (
    <PageWrapper
      seo={{
        title: pageData.title,
        description:
          pageData.content.length > 160 ? pageData.content.slice(0, 160) : "",
        canonical: `https://www.villapinedo.nl/forum/${pageData.slug}`,
        og: {
          type: "article",
          article: {
            publishedTime: pageData.date_created,
            modifiedTime: pageData.date_updated,
            authors: ["Villa Pinedo"],
            tags: pageData.categories?.map((cat) => cat.categories_id?.name),
          },
        },
      }}
    >
      <BreadCrumbs />

      <Hero
        center
        imageUrl={parseImageURL(pageData?.image?.id, 1200)}
        style={{
          minHeight: 555,
          position: "relative",
        }}
        mobileImageHeight={572}
      >
        <div className="flex flex-col items-center justify-center text-center max-w-2xl md:max-w-4xl my-16">
          <TitleWithHighlights
            text={pageData?.detail_title}
            headerElement="h1"
            color="white"
            className="text-[46px] font-[400] md:text-[64px]"
          />
          <div className="mb-8 text-[#fff] text-[18px] font-[300] md:text-[20px]">
            {pageData?.content && parseHTMLtoReact(pageData?.content)}
          </div>
        </div>
      </Hero>

      <section className="mt-[-120px]">
        <Container className="block max-w-[1385px] md:flex">
          <BriefItem
            key={`a23y2u0`}
            title={pageoverview?.letter_for_title}
            content={pageoverview?.letter_for_description}
            imgSrc={parseImageURL(undefined)}
            fileSrc={`/open-brieven/${undefined}`}
            bg={`#FE517E`}
            className="flex-1"
          />
          <LetterForm
            className="flex-1 p-0 py-10 md:px-10 md:py-0"
            onIsSubmit={onSubmit}
          />
        </Container>
      </section>

      <main style={{ marginBottom: "80px" }}>
        <CommentForm
          type="open_letter"
          comments={comments}
          preText="De Buddy’s beantwoorden alle vragen. Zij zaten in eenzelfde situatie
          als jij en hebben dus heel veel wijze raad. Maar niet alleen
          Budd's weten hoe het voelt om gescheiden ouders te hebben, jij
          ook! Heb jij een goede tip? Deel 'm hieronder!"
          postId={pageData.id}
        />
        <section className="my-[40px] md:my-[80px]">
          <CommentForm
            postId={pageData.id}
            parent={"reageer op deze brief"}
            type="open_letter"
          />
          <div className="relative">
            <Image
              src="/opeletterbothead.png"
              alt="respond to letter"
              fill
              className="relative h-[768px] mt-[600] md:h-[549px] md:mt-[-300px]"
            />
          </div>
        </section>
        <section>
          <Container>
            <div className="flex flex-col items-center justify-center my-[100px]">
              <H3 variant="bold" style={{ margin: 0 }}>
                Relevante brieven
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
