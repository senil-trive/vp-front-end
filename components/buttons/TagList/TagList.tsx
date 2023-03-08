import React, { useState } from "react";

import Tag from "../Tag/Tag";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import styled from "styled-components";

type Props = {
  tags: TagType[];
  selected?: string;
  onSelect?: (tag: string) => void;
};

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: scroll;
`;

export default function TagList({ tags, selected, onSelect }: Props) {
  return (
    <Wrapper>
      {tags.map((tag, index) => (
        <Tag
          isActive={selected === tag.id}
          key={index}
          onClick={() => onSelect?.(tag.id)}
        >
          {tag.name}
        </Tag>
      ))}
    </Wrapper>
  );
}
