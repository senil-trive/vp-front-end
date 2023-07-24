import styled from "styled-components";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import { parseDate } from "../../../utils/parseDate";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { truncate } from "../../../utils/truncate";
import { FiHeart } from "react-icons/fi";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import parseImageURL from "../../../utils/parseImageURL";

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
  comments?: number;
  fullHeight?: boolean;
  postDate?: Date;
  image: any;
};

type styledProps = {
  showButton?: boolean;
};

const StyledForumPost = styled.article<styledProps>`
  /* border: 1px solid ${({ theme }) => theme.colors.primary.normal}; */
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: #006ef7;
  height: 100%;

  // a {
  //   background: white;
  //   color: ${({ theme }) => theme.colors.secondary.normal};
  //   border: 0;
  // }

  &:hover {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px -4px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;

    background-color: white;
    // a {
    //   background-color: ${({ theme }) => theme.colors.secondary.normal};
    //   border: 0;
    //   color: white;
    // }
    header {
      p,
      h4 {
        color: ${({ theme }) => theme.colors.text.normal};
      }
    }
    .forum-tag {
      background: #006ef7 !important;
    }
    .content {
      color: ${({ theme }) => theme.colors.text.normal};
      .forum-tags {
        span {
          background: ${({ theme }) => theme.colors.secondary.normal};
          border: none;
          color: white;
          font-weight: 400;
          font-size: 18px;
          font-family: "Fjalla One";
        }
      }
    }
    footer {
      color: ${({ theme }) => theme.colors.text.normal};

      .geplaatst {
        color: ${({ theme }) => theme.colors.text.normal};
      }
    }
  }

  /* TODO: required for the home grid */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
    p,
    h4 {
      color: white;
    }
  }

  .content {
    margin-bottom: 30px;
    font-size: ${({ theme }) => theme.fontSizes.p.desktop};
    font-family: "Avenir";
    color: white;
    > div {
      display: flex;
      gap: 8px;
      margin-bottom: 30px;
    }
    .forum-tags {
      span {
        padding: 11px 10px;
        background: white;
        border: none;
        height: 41px;
        color: 3FC7B4;
        font-weight: 400;
        font-size: 18px;
        font-family: "Fjalla One";
      }
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    .geplaatst {
      color: white;
    }
    .icon-wrapper {
      display: flex;
      align-items: center;
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
  comments = 0,
  authorType,
  postDate,
  truncateContent = true,
  showButton = false,
  buttonUrl = "",
  fullHeight = true,
  tags = [],
  image,
}: Props) {
  const generateContent = () => {
    if (fullHeight && truncateContent) {
      return parseHTMLtoReact(truncate(content, 500));
    } else if (truncateContent) {
      return parseHTMLtoReact(truncate(content, 180));
    }

    return parseHTMLtoReact(content);
  };
  const ComponentTag = showButton ? "a" : "div";
  const props = showButton ? { href: buttonUrl } : {};
  return (
    <StyledForumPost
      showButton={showButton}
      style={{ minHeight: fullHeight ? "624px" : "" }}
    >
      {/* <a
        href={buttonUrl}
        className="transition h-full flex flex-col justify-between "
      > */}
      <ComponentTag {...props}>
        <div>
          {/* {!!title && (
            <header>
              <UserAvatar size="md" alt="villa pinedo" src={image} />
              <div>
                <H4
                  style={{ marginBottom: 0, marginTop: "16px" }}
                  variant="bold"
                >
                  {truncate(title, 75)}
                </H4>
              </div>
            </header>
          )} */}
          <header>
            <div>
              <p className="font-avenir font-extrabold text-lg">{title}</p>
              <p className="text-[16px] md:text-[18px] font-[300]">
                {age?.includes("jaar") ? age : `${age} jaar`}
              </p>
            </div>
          </header>
          <div className="content text-[16px] md:text-[18px]">
            {tags.length > 0 && (
              <div className="flex flex-wrap forum-tags">
                {tags.map((item, index) => (
                  <Tag
                    key={index}
                    size="m"
                    className="forum-tag"
                    color="#006ef7"
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            )}
            <h2>{authorType}</h2>
            {generateContent()}
          </div>
        </div>

        <footer>
          <div>
            <div className="icon-wrapper mr-4">
              <FiHeart size={24} />
              <p className="font-avenir font-light text-[16px] md:text-[18px]">
                {comments}
              </p>
            </div>
          </div>
          <div>
            {postDate && (
              // <P
              //   // variant="helper"
              //   color="primary"
              //   style={{ textAlign: "right" }}
              //   className=""
              // >
              // </P>
              <p className="geplaatst font-avenir font-light text-lg italic text-right">
                Geplaatst op {parseDate(postDate)}
              </p>
            )}
          </div>
        </footer>
        {/* </a> */}
      </ComponentTag>
      {/* {showButton && (
        <Button
          style={{
            margin: "1rem auto",
          }}
          variant="info"
          href={buttonUrl}
        >
          Vraag bekijken
        </Button>
      )} */}
    </StyledForumPost>
  );
}
