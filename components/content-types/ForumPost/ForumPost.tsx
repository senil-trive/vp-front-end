import styled, { useTheme } from "styled-components";

import Button from "../../buttons/Button";
import HeartIcon from "../../icons/HeartIcon/HeartIcon";
import { H4, P } from "../../typography";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import { parseDate } from "../../../utils/parseDate";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { truncate } from "../../../utils/truncate";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";

type Props = {
  authorType: string;
  gender: string;
  age: string;
  title: string;
  content: string;
  truncateContent?: boolean;
  showButton?: boolean;
  buttonUrl?: string;
  tags: string[];
  likes: number;
  fullHeight?: boolean;
  postDate?: Date;
};

const StyledForumPost = styled.article`
  /* border: 1px solid ${({ theme }) => theme.colors.primary.normal}; */
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.tertiary.light};
  height: 100%;

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
    font-size: ${({ theme }) => theme.fontSizes.p.desktop};
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

  @media ${({ theme }) => theme.breakpoints.tablet} {
    .content {
      font-size: ${({ theme }) => theme.fontSizes.p.mobile};
    }
  }
`;

export default function ForumPost({
  title,
  content,
  age,
  likes = 0,
  authorType,
  postDate,
  truncateContent = true,
  showButton = false,
  buttonUrl = "",
  fullHeight = true,
  tags = [],
}: Props) {
  const { colors } = useTheme();

  const generateContent = () => {
    if (fullHeight && truncateContent) {
      return parseHTMLtoReact(truncate(content, 500));
    } else if (truncateContent) {
      return parseHTMLtoReact(truncate(content, 180));
    }

    return parseHTMLtoReact(content);
  };

  return (
    <StyledForumPost style={{ minHeight: fullHeight ? "624px" : "" }}>
      <div className="h-full flex flex-col justify-between">
        <div>
          {!!title && (
            <header>
              {/* <UserAvatar
            size="md"
            alt="villa pinedo"
            src="/android-chrome-192x192.png"
          /> */}
              <div>
                <H4
                  style={{ marginBottom: 0, marginTop: "16px" }}
                  variant="bold"
                >
                  {truncate(title, 75)}
                </H4>
              </div>
            </header>
          )}
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

            {generateContent()}
          </div>
        </div>

        <footer>
          {likes > 0 && (
            <div className="likes mr-4">
              <>
                <HeartIcon color={colors.primary.normal} />
                <P color="primary" variant="helper">
                  {likes}
                </P>
              </>
            </div>
          )}
          <div className="flex items-center justify-between w-full">
            <P
              variant="helper"
              color="primary"
              style={{ margin: 0, fontWeight: 500 }}
            >
              {authorType} {age?.includes("jaar") ? age : `${age} jaar`}
            </P>
            {postDate && (
              <P
                variant="helper"
                color="primary"
                style={{ textAlign: "right" }}
              >
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
