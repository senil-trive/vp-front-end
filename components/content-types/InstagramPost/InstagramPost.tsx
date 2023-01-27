// import Image from "next/image";
import React from "react";
import styled from "styled-components";

type Props = {
  embedCode: string;
};

const StyledPost = styled.article`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  height: 624px;
  border: 1px solid rgb(219, 219, 219);

  iframe,
  blockquote {
    max-width: 100% !important;
    min-width: 100% !important;
    width: 100% !important;
    height: 624px !important;
    max-height: 624px !important;
    height: 100% !important;
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
  return (
    <StyledPost>
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: embedCode,
        }}
      />
    </StyledPost>
  );
}
