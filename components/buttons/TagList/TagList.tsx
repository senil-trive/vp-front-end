import React, { useEffect, useRef, useState } from "react";

import Tag from "../Tag/Tag";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import styled from "styled-components";
import { Container } from "@mui/system";

type Props = {
  tags: TagType[];
  selected?: string;
  onSelect?: (tag: string) => void;
};

const Wrapper = styled.div`
  position: relative;

  .inner {
    display: flex;
    gap: 16px;
    overflow-x: auto;

    .scroll-indicator {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100px;
      opacity: 0;
      /* transition: opacity 0.3s ease-in-out; */
      pointer-events: none;

      &.indicator-left {
        left: 0;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      &.indicator-right {
        right: 0;
        background: linear-gradient(
          to left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }

    &.scrolling-left .indicator-left {
      opacity: 1;
    }
    &.scrolling-right .indicator-right {
      opacity: 1;
    }
  }
`;

type DirectionType = "left" | "right" | "";
export default function TagList({ tags, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const newScrollLeft = containerRef?.current?.scrollLeft;
    const width = containerRef?.current?.getBoundingClientRect().width;
    const scrollWidth = containerRef?.current?.scrollWidth;

    if (newScrollLeft === 0) {
      containerRef?.current?.classList.remove("scrolling-left");
    } else if (
      newScrollLeft &&
      scrollWidth &&
      width &&
      newScrollLeft >= scrollWidth - width
    ) {
      containerRef?.current?.classList.remove("scrolling-right");
    } else {
      containerRef?.current?.classList.add("scrolling-right");
      containerRef?.current?.classList.add("scrolling-left");
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <Container style={{ marginBottom: 21 }}>
      <Wrapper>
        <div
          ref={containerRef}
          className="inner scrolling-right"
          onScroll={handleScroll}
        >
          <div className="scroll-indicator indicator-left" />
          {tags.map((tag, index) => (
            <Tag
              key={index}
              className="card-wrapper"
              isActive={selected === tag.id}
              onClick={() => onSelect?.(tag.id)}
            >
              {tag.name}
            </Tag>
          ))}
          <div className="scroll-indicator indicator-right" />
        </div>
      </Wrapper>
    </Container>
  );
}
