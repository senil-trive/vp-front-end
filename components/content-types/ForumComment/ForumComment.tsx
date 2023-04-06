import React from "react";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";

import { P } from "../../typography";
import Person from "../Person/Person";
import ShareIcon from "../../icons/ShareIcon/ShareIcon";
import MoreIcon from "../../icons/MoreIcon/MoreIcon";
import { rgba } from "../../../utils/colors";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";

type Props = {
  authorType: string;
  author: string;
  age: string;
  title: string;
  postDate?: Date;
};

const StyledForumPost = styled.article`
  position: relative;
  z-index: 1;
  margin-bottom: 40px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    border: 1px solid ${({ theme }) => theme.colors.secondary.normal};
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 34px;
    background-color: white;
  }

  footer {
    display: flex;
    gap: 28px;
    align-items: center;
    padding-bottom: 14px;
    border-bottom: 1px solid
      ${({ theme }) => rgba(theme.colors.primary.normal, 0.2)};
  }
`;

export default function ForumComment({
  title,
  author,
  age,
  authorType,
  postDate,
}: Props) {
  return (
    <StyledForumPost>
      <header>
        <Person age={age} name={author} type={authorType} color="secondary" />
        <div>
          {postDate && (
            <P variant="helper" style={{ textAlign: "right", color: "#555" }}>
              {formatDistance(postDate, new Date(), {
                includeSeconds: false,
                addSuffix: true,
                locale: nl,
              })}
            </P>
          )}
        </div>
      </header>
      <div className="content">{parseHTMLtoReact(title)}</div>
      <footer>
        <ShareIcon />
        <MoreIcon />
      </footer>
    </StyledForumPost>
  );
}
