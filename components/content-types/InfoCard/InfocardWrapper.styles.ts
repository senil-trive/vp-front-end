import styled from "styled-components";

export const InfoCardWrapper = styled.div`
  flex: 1;
  &.blog:hover {
    .info-card-footer a {
      background: #fe517e !important;
    }
  }

  &.primary:hover {
    .info-card-footer a {
      background: #006ef7 !important;
    }
  }
  &:hover {
    .info-card-footer h2,
    p,
    button,
    div,
    a {
      color: #150f2f !important;
    }
  }
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
    h2 {
      font-size: 42px !important;
      font-weight: 400 !important;
    }
    p {
      font-size: 18px !important;
      font-weight: 300 !important;
    }
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
    .info-card-footer h2 {
      font-size: 30px !important;
    }
  }
`;
