import styled from "styled-components";
import { Container } from "@mui/system";

const HeroBannerWrapper = styled(Container)`
  .title-wrap {
    text-align: center !important;
    align-items: center;
    justify-content: center;
    margin: 0 auto !important;
    width: 100%;
  }
  .subtitle {
    font-size: 18px !important;
    font-weight: 300 !important;
    line-height: 160% !important;
    font-family: "Avenir";
    font-style: "normal";
    color: #fff !important;
  }
  .title {
    width: 100%;
    font-size: 64px !important;
    font-weight: 400 !important;
    line-height: 140% !important;
    font-family: "Fjalla One";
    font-style: "normal";
  }
  &.zoeken-page {
    .search {
      font-size: 28px !important;
      font-weight: 500 !important;
      span {
        font-size: 32px !important;
        padding: 15px !important;
        font-weight: 400 !important;
      }
    }
    .title {
      margin-bottom: 32px !important;
      line-height: 118% !important;
      font-size: 80px !important;
    }
  }
  &.stel-een-vraag {
    margin-top: -100px;
  }
  &.volunteer {
    &.overview {
      .overview-act {
        border: 1px solid #fff !important;
        &:hover {
          border: none !important;
        }
      }
      .title {
        line-height: 140% !important;
      }
    }
  }
  @media (max-width: 767px) {
    .title-wrap {
      text-align: left !important;
    }
    .title {
      font-size: 46px !important;
    }
    .subtitle {
      font-size: 16px !important;
    }
    &.stel-een-vraag {
      margin-top: -50px;
    }
    &.training {
      margin-top: -200px !important;
    }
    .volunteer.overvies {
      .subtitle {
        font-weight: 400 !important;
      }
    }
    &.zoeken-page {
      .search {
        font-size: 20px !important;
        span {
          font-size: 18px !important;
        }
      }

      .title {
        margin-bottom: 32px !important;
        line-height: 118% !important;
        font-size: 46px !important;
      }
    }
  }
`;

const ContainerWrapper = styled(Container)<{ cardHeight?: number | string }>`
  .cardHeight {
    max-height: ${({ cardHeight }) => `${cardHeight}px`};
    padding-top: 0;
  }
  &.lg-container {
    max-width: 1384px !important;
  }
  &.sm-container {
    max-width: 1118px;
  }
  @media (max-width: 767px) {
    ul {
      max-height: 400px;
      height: 100%;
    }
    .cardHeight {
      margin-top: 40px;
    }
    &.zoeken {
      margin-top: -80px !important;
      section > p {
        font-size: 30px;
      }
      ul > li {
        font-size: 16px;
      }
    }
  }
`;
export { HeroBannerWrapper, ContainerWrapper };
