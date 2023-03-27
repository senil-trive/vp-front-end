import { H3, P, TitleWithHighlights } from "../../typography";

import Button from "../../buttons/Button";
/* eslint-disable @next/next/no-img-element */
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import React from "react";
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
};

export default function BriefItem({
  imgSrc,
  fileSrc,
  title,
  titleHighlighted,
  category,
  content,
}: Props) {
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
      <CardFooter>
        <div>
          <TitleWithHighlights
            color="black"
            highlightColor="tertiary"
            text={title}
            textToHighlight={titleHighlighted ?? "    "}
            headerElement="h3"
          />

          <P style={{ marginBottom: 56, marginTop: 12 }}>
            {truncate(content, 200)}
          </P>
        </div>

        <Button variant="tertiary" href={fileSrc}>
          Download brief
        </Button>
      </CardFooter>
    </Card>
  );
}
