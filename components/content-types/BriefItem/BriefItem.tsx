/* eslint-disable @next/next/no-img-element */
import Card from "../../card/Card";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import CardFooter from "../../card/CardFooter/CardFooter";
import { H3, P } from "../../typography";
import CardHeader from "../../card/CardHeader/CardHeader";
import Button from "../../buttons/Button";

type Props = {
  title: string;
  imgSrc: string;
  fileSrc: string;
  category?: string;
  content: string;
};

export default function BriefItem({
  imgSrc,
  fileSrc,
  title,
  category,
  content,
}: Props) {
  return (
    <Card variant="brief">
      <CardHeader>
        <>
          {/* TODO: Image element of NextJS doesn't work with Styleguidist */}
          <img
            className="absolute h-full w-full top-0 left-0 z-0 object-cover"
            src={imgSrc}
            alt={title}
          />

          {!!category && (
            <Tag variant="dark" size="m" position="bl">
              {category}
            </Tag>
          )}
        </>
      </CardHeader>
      <CardFooter>
        <H3 variant="bold" className="mb-[12px]">
          {title}
        </H3>
        <P className="mb-[56px]">{content}</P>

        <Button variant="primary" onClick={() => window.open(fileSrc)}>
          Download brief
        </Button>
      </CardFooter>
    </Card>
  );
}
