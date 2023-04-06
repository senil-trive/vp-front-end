import React from "react";
import styled, { css, useTheme } from "styled-components";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";

import { P } from "../../typography";
import Person from "../Person/Person";
// import ShareIcon from "../../icons/ShareIcon/ShareIcon";
// import MoreIcon from "../../icons/MoreIcon/MoreIcon";
import { rgba } from "../../../utils/colors";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { FiMessageCircle } from "react-icons/fi";

type Props = {
  author: string;
  age: string;
  title: string;
  postDate?: Date;
  isReplyComment?: boolean;
};

const StyledForumPost = styled.article<{ isReplyComment: boolean }>`
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
    /* justify-content: flex-end; */
    margin-top: 24px;
    padding-top: 12px;
    border-top: 1px solid
      ${({ theme }) => rgba(theme.colors.primary.normal, 0.2)};
  }

  ${({ isReplyComment }) => {
    if (!isReplyComment) return null;

    return css`
      margin-top: -24px;
      padding-left: 34px;

      border-bottom: 1px solid
        ${({ theme }) => rgba(theme.colors.primary.normal, 0.2)};
    `;
  }}
`;

export default function ForumComment({
  title,
  author,
  age,
  postDate,
  isReplyComment = false,
}: Props) {
  const { colors } = useTheme();

  return (
    <StyledForumPost isReplyComment={isReplyComment}>
      <header>
        <Person age={age} name={author} color="secondary" />
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
      <div className="content">
        {parseHTMLtoReact(title)}
        <footer>
          <button>
            <FiMessageCircle size={24} color={colors.secondary.normal} />
          </button>
          {/* <MoreIcon /> */}
        </footer>
      </div>
    </StyledForumPost>
  );
}
