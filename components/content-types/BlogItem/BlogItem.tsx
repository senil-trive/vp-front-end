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
  const { colors } = useTheme();

  console.log(mediaSrc);

  console.log(embedSrc);
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
        <H4 className="text-4xl" style={{ margin: 0 }} variant="bold">
          {truncate(title, 23)}
        </H4>

        <div style={{ overflowY: "auto", height: 90 }}>
          {!!content && (
            <P style={{ marginBottom: 30, marginTop: 12 }}>
              {content ? truncate(content, 200) : ""}
            </P>
          )}
        </div>
        <div className="flex items-center justify-between author-date">
          <p className="text-lg font-avenir">{author}</p>
          <p className="italic font-light font-avenir">{parseDate(postDate)}</p>
        </div>
        <Button style={{ marginTop: 56 }} variant="secondary" href={link}>
          {type == "vlog" ? "Vlog bekijken" : "Blog lezen"}
        </Button>
      </CardFooter>
    </Card>
  );
}
