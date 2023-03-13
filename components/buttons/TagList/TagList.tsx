import React from "react";
import { Container } from "@mui/system";
import styled from "styled-components";

import Tag from "../Tag/Tag";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import { useVerticalScrollHint } from "../../../utils/scroll";

type Props = {
  tags: TagType[];
  selected?: string;
  onSelect?: (tag: string) => void;
};

const Wrapper = styled.div`
  position: relative;
  margin: auto;

  .inner {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    justify-content: center;
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

export default function TagList({ tags, selected, onSelect }: Props) {
  const containerRef = useVerticalScrollHint();

  return (
    <Container maxWidth="xl" style={{ margin: "0 auto 21px" }}>
      <Wrapper>
        <div ref={containerRef} className="inner scrolling-right">
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
