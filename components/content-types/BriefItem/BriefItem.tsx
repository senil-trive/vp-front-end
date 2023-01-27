/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Button } from "../../buttons/Button";
import Tag from "../../buttons/Tag/Tag";
import { H3, P } from "../../typography/Typography";

type Props = {
  title: string;
  description: string;
  imgSrc: string;
  downloadLink: string;
  theme: string;
};

const StyledPost = styled.article`
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 8px;
  overflow: hidden;
`;

export default function BriefItem({
  title,
  description,
  imgSrc,
  downloadLink,
  theme,
}: Props) {
  return (
    <StyledPost>
      <header className="relative h-[180px] mb-0">
        {/* Image element of NextJS doesn't work with Styleguidist */}
        <img
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
          src={imgSrc}
          alt={title}
        />
        <Tag variant="dark" className="absolute bottom-[24px] left-[24px]">
          {theme}
        </Tag>
      </header>

      <section className="py-[32px] px-[24px]">
        <H3 variant="bold" className="mb-[12px]">
          {title}
        </H3>
        <P className="mb-[56px]">{description}</P>

        <Button onClick={() => window.open(downloadLink)}>
          Download brief
        </Button>
      </section>
    </StyledPost>
  );
}
