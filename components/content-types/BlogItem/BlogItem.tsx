import { H3, P, TitleWithHighlights } from "../../typography";

import Button from "../../buttons/Button";
/* eslint-disable @next/next/no-img-element */
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import { truncate } from "../../../utils/truncate";
import { format } from "date-fns";
import YoutubePlayer from "../../media/YoutubePlayer";

type Props = {
  type: "blog" | "vlog";
  title: string;
  titleHighlighted?: string;
  mediaSrc?: string;
  embedSrc?: string;
  link: string;
  category?: string;
  content?: string;
  author: string;
  postDate: Date;
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
}: Props) {
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
      /* TODO: Image element of NextJS doesn't work with Styleguidist */
      Child = (
        <img
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
          src={mediaSrc}
          alt={title}
        />
      );
    }

    if (!Child) return;

    return (
      <CardHeader>
        <>
          {Child}
          {!!category && (
            <Tag variant="dark" size="m" position="bl">
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
        <H3>{title}</H3>

        <P style={{ marginBottom: 56, marginTop: 12 }}>
          {content ? truncate(content, 200) : ""}
        </P>

        <div className="flex items-center justify-between pb-[56px]">
          <P variant="bold">{author}</P>
          <P>{format(postDate, "dd/mm/yyyy")}</P>
        </div>
        <Button variant="secondary" onClick={() => window.open(link)}>
          {type == "vlog" ? "Vlog bekijken" : "Blog lezen"}
        </Button>
      </CardFooter>
    </Card>
  );
}
