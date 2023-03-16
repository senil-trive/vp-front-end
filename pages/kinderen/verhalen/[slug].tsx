import { H3, P, TitleWithHighlights } from "../../../components/typography";

import { BlogDetailPageProps } from "../../../types/pageTypes";
import BlogItem from "../../../components/content-types/BlogItem/BlogItem";
import BreadCrumbs from "../../../components/layout/BreadCrumbs/BreadCrumbs";
import CommentForm from "../../../components/form/CommentForm/CommentForm";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { Hero } from "../../../components/layout";
import Image from "next/image";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import Tag from "../../../components/buttons/Tag/Tag";
import YoutubePlayer from "../../../components/media/YoutubePlayer";
import { getPostDetail } from "../../../utils/api";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import parseImageURL from "../../../utils/parseImageURL";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the letters
    const pageReq = await getPostDetail(slug as string);
    const { data } = await pageReq.json();

    return {
      props: {
        pageData: data[0] ?? null,
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

export default function BlogDetail({ pageData }: BlogDetailPageProps) {
  const generateMediaItem = () => {
    let Child = null;

    if (pageData?.youtube_embed) {
      Child = <YoutubePlayer src={pageData?.youtube_embed} />;
    }

    if (pageData?.type === "vlog" && pageData?.video?.id) {
      Child = (
        <video
          src={parseImageURL(pageData?.video.id)}
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
        />
      );
    } else if (pageData?.image?.id) {
      Child = (
        <Image
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
          src={parseImageURL(pageData?.image.id)}
          alt={pageData.title}
          fill
        />
      );
    }

    if (!Child) return;

    return (
      <div className="relative border overflow-hidden h-[317px] rounded-[8px]">
        <>{Child}</>
      </div>
    );
  };

  return (
    <PageWrapper title={pageData?.title}>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <Hero>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
            {pageData?.categories[0] && (
              <Tag variant="dark" size="m">
                <>{pageData?.categories[0]?.categories_id?.name}</>
              </Tag>
            )}
            {pageData?.author && <P>{pageData.author}:</P>}
            <TitleWithHighlights
              highlightColor="info"
              text={`"${pageData?.title}"`}
              textToHighlight={pageData?.title ?? ""}
              headerElement="h1"
              color="primary"
            />
          </div>
        </Hero>

        <Container>
          <article>
            <div>{generateMediaItem()}</div>

            <div className="columns-2 mt-[50px] mb-[90px]">
              {parseHTMLtoReact(pageData?.content ?? "")}
            </div>
          </article>

          {pageData?.id && (
            <CommentForm comments={pageData?.comments} postId={pageData?.id} />
          )}
        </Container>

        {pageData?.related?.length && pageData?.related?.length > 0 ? (
          <section>
            <Container>
              <div className="flex flex-col items-center justify-center my-[100px]">
                <H3 variant="bold" style={{ margin: 0 }}>
                  Relevante blogs of vlogs
                </H3>
              </div>
            </Container>
            <Container maxWidth="xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {pageData?.related.map((post) => (
                  <BlogItem
                    key={post.related_vlogposts_id.id}
                    mediaSrc={
                      post.related_vlogposts_id?.image?.id
                        ? parseImageURL(post.related_vlogposts_id.image.id)
                        : ""
                    }
                    embedSrc={post.related_vlogposts_id.youtube_embed}
                    link={`verhalen/${post.related_vlogposts_id.id}`}
                    type={post.related_vlogposts_id.type}
                    author={post.related_vlogposts_id.author}
                    content={post.related_vlogposts_id.content}
                    postDate={new Date(post.related_vlogposts_id.date_created)}
                    category={
                      post.related_vlogposts_id.categories[0]?.categories_id
                        ?.name
                    }
                    title={post.related_vlogposts_id.title}
                  />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
    </PageWrapper>
  );
}