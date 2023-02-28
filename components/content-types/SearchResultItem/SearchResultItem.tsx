import Link from "next/link";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { P } from "../../typography";

type Props = {
  /** The amount of search results found */
  amount: number;

  /** The color of the result block */
  colorVariant?: 1 | 2;

  /** The text that will be appended to the result title */
  resultTitleSuffix?: ReactNode;

  /** A list of links to pages the will be shown */
  list: {
    name: string;
    link: string;
  }[];
};

const Wrapper = styled.div<{ colorVariant: number }>`
  height: 100%;

  .summary {
    font-weight: 800;
    color: ${({ theme, colorVariant }) => {
      switch (colorVariant) {
        case 1:
          return theme.colors.primary;
        case 2:
          return theme.colors.info;

        default:
          return theme.colors.primary;
      }
    }};
  }
  .category {
    text-transform: capitalize;
  }

  ul {
    padding: 24px;
    gap: 12px;
    background: ${({ colorVariant }) => {
      switch (colorVariant) {
        case 1:
          return "rgba(0, 110, 247, 0.05)";
        case 2:
          return "rgba(255, 151, 29, 0.025)";

        default:
          return "rgba(0, 110, 247, 0.05)";
      }
    }};
    border-radius: 8px;
    padding-inline-start: 40px;

    li {
      font-weight: 300;
      font-size: 18px;
      line-height: 160%;

      color: ${({ theme, colorVariant }) => {
        switch (colorVariant) {
          case 1:
            return theme.colors.primary;
          case 2:
            return theme.colors.info;

          default:
            return theme.colors.primary;
        }
      }};
    }
  }
`;

export default function SearchResultItem({
  amount,
  resultTitleSuffix,
  list,
  colorVariant = 1,
}: Props) {
  return (
    <Wrapper colorVariant={colorVariant}>
      <section>
        <P variant="light">
          <span className="summary">
            {amount} {amount === 1 ? "Resultaat" : "Resultaten"}
          </span>{" "}
          {resultTitleSuffix}
        </P>
      </section>

      <ul>
        {list.map((item) => (
          <li key={item.link}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}