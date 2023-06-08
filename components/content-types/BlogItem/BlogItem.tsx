import { H4, P } from "../../typography";

import Button from "../../buttons/Button";
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import Image from "next/image";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import YoutubePlayer from "../../media/YoutubePlayer";
import { parseDate } from "../../../utils/parseDate";
import { truncate } from "../../../utils/truncate";
import { useTheme } from "styled-components";

type Props = {
  type: "blog" | "vlog";
  title: string;
  titleHighlighted?: string;
  mediaSrc?: string;
  embedSrc?: string;
  link: string;
  description?: string;
  category?: string;
  content?: string;
  author: string;
  postDate: Date;
  buttonText?: string;
};

export default function BlogItem({
  type = "blog",
  mediaSrc,
  embedSrc,
  link,
  title,
  category,
  content,
  author,
  postDate,
  buttonText,
  description,
}: Props) {
  const { colors } = useTheme();
  const generateMediaItem = () => {
    let Child = null;

    if (embedSrc) {
      Child = <YoutubePlayer src={embedSrc} />;
    }

    if (type === "vlog" && mediaSrc) {
      Child = (
        <video
          src={mediaSrc}
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
        />
      );
    } else if (mediaSrc) {
      Child = (
        <Image
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
          src={mediaSrc}
          alt={title}
          fill
        />
      );
    }

    if (!Child) return;

    return (
      <CardHeader>
        <>
          {Child}
          {!!category && (
            <Tag
              variant="dark"
              size="m"
              position="blNew"
              style={{
                backgroundColor: colors.info.normal,
                borderColor: colors.info.normal,
              }}
            >
              <>{category}</>
            </Tag>
          )}
        </>
      </CardHeader>
    );
  };
  return (
    <Card variant={type}>
      {generateMediaItem()}
      <CardFooter>
        <H4 className="title text-4xl" style={{ margin: 0 }} variant="bold">
          {truncate(title, 23)}
        </H4>
        {!!description ? (
          <div className="blog-description">
            <P style={{ marginBottom: 30, marginTop: 12 }}>{description}</P>
          </div>
        ) : (
          <div style={{ overflowY: "auto", height: 90 }}>
            {!!content && (
              <P style={{ marginBottom: 30, marginTop: 12 }}>
                {content ? truncate(content, 200) : ""}
              </P>
            )}
          </div>
        )}
        <div className="flex items-center justify-between author-date mb-[20px] mt-[0]">
          <p className="text-[18px] font-avenir font-[900]">{author}</p>
          <p className="italic font-light font-avenir">{parseDate(postDate)}</p>
        </div>
        <Button style={{ marginTop: "auto" }} variant="secondary" href={link}>
          {buttonText
            ? buttonText
            : type == "vlog"
            ? "Vlog bekijken"
            : "Blog lezen"}
        </Button>
      </CardFooter>
    </Card>
  );
}
