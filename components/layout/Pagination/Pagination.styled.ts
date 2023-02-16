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
    color: ${({ theme }) => theme.colors.tertiary};
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
          border: 1px solid;
          color: ${({ theme }) => theme.colors.tertiary};

          &.active {
            color: white;
            background: ${({ theme }) => theme.colors.tertiary};
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
