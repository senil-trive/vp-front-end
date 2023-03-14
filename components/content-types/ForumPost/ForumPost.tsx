import styled, { useTheme } from "styled-components";

import HeartIcon from "../../icons/HeartIcon/HeartIcon";
import IconButton from "../../buttons/IconButton/IconButton";
import { IoMdPerson } from "react-icons/io";
import { P } from "../../typography";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import { format } from "date-fns";
import { parseDateRelative } from "../../../utils/parseDate";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { truncate } from "../../../utils/truncate";

type Props = {
  authorType: string;
  gender: string;
  age: string;
  title: string;
  truncateContent?: boolean;
  tags: string[];
  likes: number;
  postDate?: Date;
};

const StyledForumPost = styled.article`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;

  header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
  }

  .content {
    margin-bottom: 30px;
    > div {
      display: flex;
      gap: 8px;
      margin-bottom: 30px;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .likes {
      display: flex;
      gap: 5.55px;
    }
    p {
      margin: 0;
    }
  }
`;

export default function ForumPost({
  title,
  gender,
  age,
  likes = 0,
  authorType,
  postDate,
  truncateContent = false,
  tags = [],
}: Props) {
  const { colors } = useTheme();

  return (
    <StyledForumPost>
      <header>
        <IconButton wrapperSize={64} wrapperColor="#E0E0E0" Icon={IoMdPerson} />
        <div>
          <P color="info" style={{ margin: 0, fontWeight: 500 }}>
            {authorType}
          </P>

          <P style={{ margin: 0, fontWeight: 300 }}>
            {gender}, {age?.includes("jaar") ? age : `${age} jaar`}
          </P>
        </div>
      </header>
      <div className="content">
        {tags.length > 0 && (
          <div className="flex">
            {tags.map((item, index) => (
              <Tag key={index} size="m">
                {item}
              </Tag>
            ))}
          </div>
        )}

        {truncateContent
          ? parseHTMLtoReact(truncate(title, 200))
          : parseHTMLtoReact(title)}
      </div>
      <footer>
        <div className="likes">
          {likes > 0 && (
            <>
              <HeartIcon color={colors.info} />
              <P color="info" variant="helper">
                {likes}
              </P>
            </>
          )}
        </div>
        <div>
          {postDate && (
            <P variant="helper" color="info" style={{ textAlign: "right" }}>
              Geplaatst op {parseDateRelative(postDate)}
            </P>
          )}
        </div>
      </footer>
    </StyledForumPost>
  );
}
