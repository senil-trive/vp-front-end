import React, { ReactNode, useRef, useState } from "react";

import { BsChevronRight } from "react-icons/bs";
import { P } from "../../typography";
import styled from "styled-components";

type Props = {
  /** The amount of search results found */
  amount: number;

  /** The color of the result block */
  colorVariant?: 1 | 2 | 3;

  /** The text that will be appended to the result title */
  resultTitleSuffix?: ReactNode;

  /** A list of links to pages the will be shown */
  list: {
    name: string;
    link: string;
  }[];
};

const Wrapper = styled.div<{ colorVariant: number }>`
  border-radius: 8px;
  .summary {
    font-family: "Fjalla One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 120%;
    color: white;
    margin-bottom: 15px;
  }
  height: 100%;

  .category {
    text-transform: capitalize;
  }

  background: ${({ theme, colorVariant }) => {
    switch (colorVariant) {
      case 1:
        return theme.colors.tertiary.normal;
      case 2:
        return theme.colors.secondary.normal;
      case 3:
        return theme.colors.primary.normal;

      default:
        return theme.colors.tertiary.light;
    }
  }};
  padding: 50px;
  ul {
    gap: 12px;
    border-radius: 8px;
    // padding-inline-start: 40px;

    li {
      a {
        span {
          font-family: "Avenir";
        }
      }
      font-weight: 500;
      font-size: 18px;
      line-height: 160%;
      margin-bottom: 15px;
      color: #ffff;
    }
  }
`;
export default function SearchResultItem({
  amount,
  resultTitleSuffix,
  list,
  colorVariant = 1,
}: Props) {
  const forumsearched = useRef(null);
  const docForum = forumsearched.current;
  const [scrollHeight, setScrollHeight] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  return (
    <Wrapper colorVariant={colorVariant}>
      <section>
        <p className="summary uppercase">
          {amount} {amount === 1 ? "Resultaat" : "Resultaten"}
          {resultTitleSuffix}
        </p>
      </section>

      {list.length > 0 && (
        <ul className="list-disc list-none" ref={forumsearched}>
          {list.map((item) => (
            <li key={item.link}>
              <a href={item.link} className="flex items-center hover:underline">
                <span>{item.name}</span>
                <BsChevronRight
                  className="ml-2 font-extrabold"
                  style={{ minWidth: 18 }}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
}
