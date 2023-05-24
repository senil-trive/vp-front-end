import styled from "styled-components";

export const PaginationWrapper = styled.div`
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
    color: #000;
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
          background: white;
          border: 1px solid #3FC7B4;
          color: #000;

          &.active {
            color: white;
            background:#3FC7B4;
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
