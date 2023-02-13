import React, { useState } from "react";
import styled from "styled-components";
import Tag from "../Tag/Tag";

type Props = {
  tags: string[];
};

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: scroll;
`;

export default function TagList({ tags }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <Wrapper>
      {tags.map((tag, index) => (
        <Tag
          isActive={selected === index}
          key={index}
          onClick={() => setSelected(index)}
        >
          {tag}
        </Tag>
      ))}
    </Wrapper>
  );
}
