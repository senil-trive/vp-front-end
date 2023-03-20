import React from "react";
import styled, { useTheme } from "styled-components";
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
  age: number;
  title: string;
  postDate?: Date;
  profileImage?: string;
};

const StyledForumPost = styled.article`
  position: relative;
  z-index: 1;
  margin-bottom: 40px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .content {
    border: 1px solid ${({ theme }) => theme.colors.secondary.normal};
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 34px;
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
  profileImage = "https://randomuser.me/api/portraits/lego/2.jpg",
}: Props) {
  const { colors } = useTheme();
  const accentColor = colors.secondary;

  return (
    <StyledForumPost>
      <header>
        <Person
          avatar={profileImage}
          age={age}
          name={author}
          type={authorType}
          color={accentColor.normal}
        />
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
