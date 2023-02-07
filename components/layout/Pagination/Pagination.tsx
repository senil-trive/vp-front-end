import React, { useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  /** The total amount of items of the pagination */
  total: number;

  /** Wether to show a shortened variant of the pagination items */
  truncated?: boolean;
};

const ellipsis = css<{ before: boolean }>`
  content: "\2026";
  font-size: 24px;
  display: inline-block;

  ${({ before }) => {
    if (before) {
      return "margin-right: 2.5px;";
    } else {
      return "margin-left: 2.5px;";
    }
  }}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background-color: white;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  > button {
    font-weight: 700;
    font-size: 18px;
    line-height: 160%;
    color: #000000;
  }

  nav {
    padding-left: 4px;
    padding-right: 4px;

    ol {
      padding: 0;
      display: flex;
      justify-content: space-between;
      list-style: none;

      li {
        /* display: none; */
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 11px;
          gap: 6px;

          margin: 0 4px;

          height: 30px;
          min-width: 30px;

          border-radius: 8px;
          background: #e0e0e0;
          color: #555555;

          &.active {
            color: white;
            background: #555555;
          }
        }

        &:first-child,
        &.active,
        &.active-sibling {
        }
      }
    }
  }
`;

const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const clamp = (number: number, lower: number, upper: number) => {
  return Math.min(Math.max(number, lower), upper);
};

const pagination = (
  currentPage: number,
  pageTotal: number,
  pagesToShow: number,
  MINIMUM_PAGE_SIZE: number = 5
) => {
  let delta: number;
  currentPage = clamp(currentPage, 1, pageTotal);
  pagesToShow = clamp(pagesToShow, MINIMUM_PAGE_SIZE, pageTotal);

  const centerPagesToShow = pagesToShow - 5;
  const boundaryPagesToShow = pagesToShow - 3;

  if (pageTotal <= pagesToShow) {
    delta = pagesToShow;
  } else {
    delta =
      currentPage < boundaryPagesToShow ||
      currentPage > pageTotal - boundaryPagesToShow
        ? boundaryPagesToShow
        : centerPagesToShow;
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === pageTotal) {
    range.start += 1;
    range.end += 1;
  }
  let pages: (string | number)[] =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageTotal - delta),
          Math.min(range.end, pageTotal)
        )
      : getRange(1, Math.min(pageTotal, delta + 1));

  if (
    currentPage > pageTotal - boundaryPagesToShow &&
    pageTotal > pagesToShow
  ) {
    pages = getRange(pageTotal - delta, pageTotal);
  }

  const withDots = (value: number, pair: (string | number)[]) =>
    pages.length + 1 !== pageTotal ? pair : [value];
  const lastPage = pages[pages.length - 1];

  if (pages[0] !== 1) {
    pages = withDots(1, [1, "..."]).concat(pages);
  }

  if (lastPage && lastPage < pageTotal) {
    pages = pages.concat(withDots(pageTotal, ["...", pageTotal]));
  }

  return pages;
};

export default function Pagination({ truncated = false, total = 1 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  let pages: (number | string)[] = Array.from(
    { length: total },
    (v, i) => i
  ).map((i) => i + 1);

  if (truncated) {
    pages = pagination(currentPage, total, 5, 7);
  }

  const handleChangePage = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((val) => val - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < total) {
      setCurrentPage((val) => val + 1);
    }
  };

  const generateClassName = (index: number) => {
    let classes = "";

    if (currentPage === index) {
      classes = `${classes} active`;
    }

    return classes;
  };

  return (
    <Wrapper>
      <button onClick={handlePrev}>Prev</button>
      <nav>
        <ol>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => handleChangePage(page)}
                className={generateClassName(page as number)}
              >
                {page}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <button onClick={handleNext}>Next</button>
    </Wrapper>
  );
}
