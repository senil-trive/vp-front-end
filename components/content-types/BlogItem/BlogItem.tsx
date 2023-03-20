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
              position="bl"
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
      <CardFooter style={{ padding: "24px 0 0 0" }}>
        <div className="flex items-center justify-between pb-[30px]">
          <P color="info" style={{ margin: 0 }} variant="helper">
            {author}
          </P>
          <P style={{ margin: 0 }} variant="helper">
            {parseDate(postDate)}
          </P>
        </div>

        <H4 style={{ margin: 0 }} variant="bold">
          {title}
        </H4>

        {!!content && (
          <P style={{ marginBottom: 30, marginTop: 12 }}>
            {content ? truncate(content, 200) : ""}
          </P>
        )}

        <Button style={{ marginTop: 56 }} variant="secondary" href={link}>
          {type == "vlog" ? "Vlog bekijken" : "Blog lezen"}
        </Button>
      </CardFooter>
    </Card>
  );
}
