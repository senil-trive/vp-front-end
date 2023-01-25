import React from "react";
import styled from "styled-components";
import { IoMdPerson } from "react-icons/io";
import { format } from "date-fns";

import IconButton from "../../buttons/IconButton/IconButton";
import { H3, P } from "../../typography/Typography";
import Tag from "../../buttons/Tag/Tag";
import HeartIcon from "../../icons/HeartIcon/HeartIcon";

type Props = {
  authorType: string;
  author: string;
  age: number;
  title: string;
  tags: string[];
  likes: number;
  postDate?: Date;
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

export default function ForumPost({
  title,
  author,
  age,
  likes = 0,
  authorType,
  postDate,
  tags = [],
}: Props) {
  return (
    <StyledForumPost>
      <header>
        <IconButton wrapperSize={64} wrapperColor="#E0E0E0" Icon={IoMdPerson} />
        <div>
          <P variant="bold">{authorType}</P>
          <P variant="helper">
            {author}, {age} jaar
          </P>
        </div>
      </header>
      <div className="mb-[30px]">
        <div className="flex gap-[30px] mb-[30px]">
          {tags.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </div>
        <H3>{title}</H3>
      </div>
      <footer className="flex justify-between">
        <div className="flex gap-[5.55px]">
          {likes > 0 && (
            <>
              <HeartIcon color="black" />
              <P variant="helper">{likes}</P>
            </>
          )}
        </div>
        <div>
          {postDate && (
            <P variant="helper" style={{ textAlign: "right", color: "#555" }}>
              Geplaatst op {format(postDate, "dd/mm/yyyy")}
            </P>
          )}
        </div>
      </footer>
    </StyledForumPost>
  );
}
