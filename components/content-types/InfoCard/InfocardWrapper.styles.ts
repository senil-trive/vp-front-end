import styled from "styled-components";

export const InfoCardWrapper = styled.div`
  flex: 1;
  header {
    height: 180px !important;
    img {
      height: 180px !important;
    }
  }
  .footer-content {
    margin-bottom: 20px;
  }
  .info-card-footer {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
  @media (min-width: 768px) and (max-width: 1106px) {
    h2 {
      font-size: 34px;
    }
  }
  @media (max-width: 767px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`;
