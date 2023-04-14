import { Container } from "@mui/system";
import React, { ReactNode } from "react";
import Tag from "../Tag/Tag";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import styled from "styled-components";
import { useHorizontalScrollHints } from "../../../utils/scroll";

type Props = {
  tags: TagType[];
  selected?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onSelect?: (tag: string) => void;
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;

  .outer {
    position: relative;
    overflow: hidden;
    padding-top: 24px;
    padding-bottom: 24px;

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
        border-radius: 8px;

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
  }
`;

export default function TagList({
  prefix,
  suffix,
  tags,
  selected,
  onSelect,
}: Props) {
  const containerRef = useHorizontalScrollHints();

  const isSelected = (id: string) => selected === id;

  return (
    <Container maxWidth="xl" style={{ margin: "21px auto" }}>
      <Wrapper>
        <div style={{ display: "block", padding: "0 20px" }}>{prefix}</div>
        <div className="outer">
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
        </div>
        <div style={{ width: 94, padding: "0 30px" }}>{suffix}</div>
      </Wrapper>
    </Container>
  );
}
