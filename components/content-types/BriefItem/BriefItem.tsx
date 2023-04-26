import { H3, P, TitleWithHighlights } from "../../typography";

import Button from "../../buttons/Button";
/* eslint-disable @next/next/no-img-element */
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import React, { useState } from "react";
import Tag from "../../buttons/Tag/Tag";
import { truncate } from "../../../utils/truncate";
import Image from "next/image";

type Props = {
  title: string;
  titleHighlighted?: string;
  imgSrc: string;
  fileSrc: string;
  category?: string;
  content: string;
  bg: string;
};

export default function BriefItem({
  imgSrc,
  fileSrc,
  title,
  titleHighlighted,
  category,
  content,
  bg,
}: Props) {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Card variant="brief">
      <CardHeader style={{ height: 262 }}>
        <>
          <Image
            className="absolute h-full w-full top-0 left-0 z-0 object-cover"
            src={imgSrc}
            alt={title}
            fill
          />

          {!!category && (
            <Tag variant="dark" size="m" position="bl">
              {category}
            </Tag>
          )}
        </>
      </CardHeader>
      <CardFooter
        className={`group bg-[${bg}] hover:bg-white`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={
          hovering
            ? {
                background: `white`,
              }
            : {
                background: bg,
              }
        }
      >
        <div>
          <TitleWithHighlights
            color="white"
            highlightColor="tertiary"
            text={title + " ✍🏽"}
            textToHighlight={titleHighlighted ?? "    "}
            headerElement="h3"
            className="transition group-hover:text-black"
          />

          <P
            className="transition text-white group-hover:text-black"
            style={{ marginBottom: 56, marginTop: 12 }}
          >
            {truncate(content, 200)}
          </P>
        </div>
        <Button
          href={fileSrc}
          style={
            hovering
              ? {
                  background: bg,
                  color: `white`,
                }
              : {
                  background: `white`,
                  color: bg,
                }
          }
          // variant="tertiary"
        >
          Download brief
        </Button>
      </CardFooter>
    </Card>
  );
}
