import styled from "styled-components";
import { Container } from "@mui/system";

const HeroBannerWrapper = styled(Container)`
  .title-wrap {
    text-align: center !important;
    align-items: center;
    justify-content: center;
    margin: 0 auto !important;
  }
  .subtitle {
    font-size: 18px !important;
    font-weight: 300 !important;
    line-height: 120% !important;
    font-family: "Avenir";
    font-style: "normal";
  }
  .title {
    font-size: 64px !important;
    font-weight: 400 !important;
    line-height: 160% !important;
    font-family: "Fjalla One";
    font-style: "normal";
  }
  &.zoeken-page {
    .subtitle {
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
    }
  }
  @media (max-width: 767px) {
    .title {
      font-size: 46px !important;
    }
    .subtitle {
      font-size: 16px !important;
    }
    &.zoeken-page {
      .subtitle {
        font-size: 20px !important;
        span {
          font-size: 18px !important;
        }
      }
      .title {
        margin-bottom: 32px !important;
        line-height: 118% !important;
      }
    }
  }
`;

const ContainerWrapper = styled(Container)`
  &.lg-container {
    max-width: 1384px !important;
  }
  &.sm-container {
    max-width: 1118px;
  }
`;
export { HeroBannerWrapper, ContainerWrapper };
