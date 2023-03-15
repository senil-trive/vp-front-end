import styled, { useTheme } from "styled-components";

import { BsPatchQuestionFill } from "react-icons/bs";
import Button from "../../buttons/Button";
import HeartIcon from "../../icons/HeartIcon/HeartIcon";
import IconButton from "../../buttons/IconButton/IconButton";
import { P } from "../../typography";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import { parseDate } from "../../../utils/parseDate";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { truncate } from "../../../utils/truncate";

type Props = {
  authorType: string;
  gender: string;
  age: string;
  title: string;
  truncateContent?: boolean;
  showButton?: boolean;
  buttonUrl?: string;
  tags: string[];
  likes: number;
  fullHeight?: boolean;
  postDate?: Date;
};

const StyledForumPost = styled.article`
  background: #ffffff;
  /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background: rgba(0, 110, 247, 0.05);

  /* TODO: required for the home grid */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
  age,
  likes = 0,
  authorType,
  postDate,
  truncateContent = true,
  showButton = false,
  buttonUrl = "",
  fullHeight = false,
  tags = [],
}: Props) {
  const { colors } = useTheme();

  return (
    <StyledForumPost style={{ minHeight: fullHeight ? "624px" : "" }}>
      <div>
        <header>
          <IconButton
            wrapperSize={64}
            wrapperColor="white"
            iconColor={colors.info}
            Icon={BsPatchQuestionFill}
          />
          <div>
            <P color="info" style={{ margin: 0, fontWeight: 500 }}>
              {authorType}
            </P>

            <P style={{ margin: 0, fontWeight: 300 }}>
              {age?.includes("jaar") ? age : `${age} jaar`}
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
            ? parseHTMLtoReact(truncate(title, 180))
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
                Geplaatst op {parseDate(postDate)}
              </P>
            )}
          </div>
        </footer>
      </div>
      {showButton && (
        <Button
          style={{
            margin: "1rem auto",
          }}
          variant="info"
          href={buttonUrl}
        >
          Vraag bekijken
        </Button>
      )}
    </StyledForumPost>
  );
}
