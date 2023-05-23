import styled from "styled-components";

export const VolunteerWrapper = styled.div`
  position: relative;
  min-width: 200px;
  width: 100%;
  max-width: 340px;
  min-height: 150px;
  @media (max-width: 1199px) {
    min-width: 150px;
    max-width: 300px;
    padding: 20px !important;
  }
  @media (max-width: 991px) {
    max-width: 250px;
    padding: 15px !important;

    .week-title {
      font-size: 20px !important;
    }
    .input-box {
      font-size: 14px;
    }
    li > div > div {
      padding: 8px 10px;
    }
  }

  @media (max-width: 800px) {
    max-width: 235px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 20px 0 !important;
  }
  &.active {
    .circle {
      &::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #000;
        display: flex;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
      }
    }
  }
  .line {
    position: absolute;
    top: 100%;
    left: 40px;
    height: 100px;
    width: 4px;
    background: #3fc7b4;
  }
  .circle {
    position: absolute;
    bottom: -106px;
    left: 34px;
    height: 15px;
    width: 15px;
    background: #3fc7b4;
    border-radius: 50%;
  }
  &.bottom {
    .line {
      bottom: 100%;
      top: unset;
    }
    .circle {
      top: -106px;
      bottom: unset;
    }
  }
`;
