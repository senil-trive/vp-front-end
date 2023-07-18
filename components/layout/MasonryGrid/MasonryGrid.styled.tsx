import styled from "styled-components";

export const MasonryGridWrapper = styled.div`
  margin-bottom: 32px;
  overflow-x: hidden;
  .mason-grid {
    .grid-item {
      margin: 11px;
      height: 100%;
      width: calc(100% - 22px);
    }
  }

  @media ${({ theme }) => theme.devices.tablet} {
    .mason-grid {
      display: flex;
      flex-wrap: wrap;

      .grid-item {
        max-height: 630px;
        margin: 16px auto;

        > div,
        > article,
        > figure {
          min-height: 100%;
          max-height: 630px;
          height: 630px;
          width: 100%;
        }

        > iframe {
          width: 100%;
          max-width: 100% !important;
        }

        &.grid-item-w-3 {
          width: calc(33% - 22px);
        }
        &.grid-item-w-4 {
          width: calc(50% - 22px);
        }
        &.grid-item-w-6 {
          width: calc(50% - 22px);
        }
        &.grid-item-w-8 {
          width: calc(50% - 22px);
          &:first-of-type {
            width: calc(100% - 22px);
          }
        }
      }
    }
  }
  @media ${({ theme }) => theme.devices.laptopL} {
    .mason-grid {
      .grid-item {
        &.grid-item-w-3 {
          width: calc(${(100 / 12) * 3}% - 22px);
        }
        &.grid-item-w-4 {
          width: calc(${(100 / 12) * 4}% - 22px);
        }
        &.grid-item-w-6 {
          width: calc(${(100 / 12) * 6}% - 22px);
        }
        &.grid-item-w-8 {
          width: calc(${(100 / 12) * 8}% - 22px);
          &:first-of-type {
            width: calc(${(100 / 12) * 8}% - 22px);
          }
        }
      }
    }
  }
`;
