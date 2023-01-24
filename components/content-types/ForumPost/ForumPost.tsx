import React from "react";
import styled from "styled-components";
import { IoMdPerson } from "react-icons/io";

import IconButton from "../../buttons/IconButton/IconButton";
import { H3, P } from "../../typography/Typography";

type Props = {
  title: string;
};

const StyledForumPost = styled.article`
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 8px;
  padding: 24px;

  header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 32px;
  }
`;

export default function ForumPost({ title }: Props) {
  return (
    <StyledForumPost>
      <header>
        <IconButton wrapperSize={64} wrapperColor="#E0E0E0" Icon={IoMdPerson} />
        <div>
          <P variant="bold"> Buddy</P>
          <P variant="helper">Mathijs, 18 jaar</P>
        </div>
      </header>
      <div>
        <H3>{title}</H3>
      </div>
      <footer></footer>
    </StyledForumPost>
  );
}
