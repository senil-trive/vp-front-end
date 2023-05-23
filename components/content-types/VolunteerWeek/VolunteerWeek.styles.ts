import styled from "styled-components";

export const VolunteerWrapper = styled.div`
  position: relative;

  .line {
    position: absolute;
    top: 100%;
    left: 40px;
    height: 100px;
    width: 2px;
    background: #000000;
  }
  .circle {
    position: absolute;
    bottom: -104px;
    left: 36px;
    height: 10px;
    width: 10px;
    background: #000000;
    border-radius: 50%;
  }
  &.bottom {
    .line {
      bottom: 100%;
      top: unset;
    }
    .circle {
      top: -104px;
      bottom: unset;
    }
  }
`;
