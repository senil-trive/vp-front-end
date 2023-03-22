import { Container } from "@mui/system";
import React from "react";
import Tag from "../Tag/Tag";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import styled from "styled-components";
import { useHorizontalScrollHints } from "../../../utils/scroll";

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
    width: 100%;

    .tag {
      &:first-of-type {
        margin-left: auto;
      }

      &:last-of-type {
        margin-right: auto;
      }
    }

    .scroll-indicator {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100px;
      opacity: 0;
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

    &::-webkit-scrollbar {
      display: none;
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
  const containerRef = useHorizontalScrollHints();

  const isSelected = (id: string) => selected === id;

  return (
    <Container maxWidth="xl" style={{ margin: "21px auto" }}>
      <Wrapper>
        <div ref={containerRef} className="inner scrolling-right">
          <div className="scroll-indicator indicator-left" />
          {tags.map((tag, index) => (
            <Tag
              key={index}
              className="tag"
              isActive={isSelected(tag.id)}
              onClick={() => onSelect?.(isSelected(tag.id) ? "" : tag.id)}
              style={{
                backgroundColor: isSelected(tag.id) ? "" : "white",
              }}
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
