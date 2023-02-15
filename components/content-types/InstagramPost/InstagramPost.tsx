import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Script from "next/script";

type Props = {
  embedCode: string;
};

const StyledPost = styled.article`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 624px;
  border: 1px solid rgb(219, 219, 219);

  > div {
    height: 100%;
    width: 100%;
  }

  iframe,
  blockquote {
    max-width: 100% !important;
    min-width: 100% !important;
    width: 100% !important;
    max-height: 624px !important;
    height: inherit !important;
    border: none !important;
  }

  blockquote {
    background-color: #b8b8b8 !important;
    > div {
      height: 100%;
      position: relative;
      a {
        height: 100%;
        > div:not([style*="height:50px; margin:0 auto 12px; width:50px;"]) {
          display: none !important;
        }
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  p {
    display: none;
  }
`;

export default function InstagramPost({ embedCode }: Props) {
  const id = `ig-embed-${uuidv4()}`;
  // this regex will parse through the html block looking for a script tag, if it finds one, the value will be the src from the script
  // example: console.log(src) ---> "https://instagram.embed.js.com"
  const scriptSRC = embedCode.match(/src="([^"]*)"/)?.[1];

  return (
    <StyledPost>
      <div
        dangerouslySetInnerHTML={{
          __html: embedCode,
        }}
      />
      {scriptSRC && <Script src={scriptSRC} id={id} />}
    </StyledPost>
  );
}
