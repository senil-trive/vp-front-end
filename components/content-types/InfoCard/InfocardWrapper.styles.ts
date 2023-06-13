import styled from "styled-components";

export const InfoCardWrapper = styled.div`
  flex: 1;
  &.blog:hover {
    article {
      background: #fff !important;
    }
    .info-card-footer a,
    button {
      background: #fe517e !important;
      color: #fff !important;
    }
  }

  &.primary:hover {
    article {
      background: #fff !important;
    }
    .info-card-footer a,
    button {
      background: #006ef7 !important;
      color: #fff !important;
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

  .info-card-footer {
    h2 {
      font-size: 32px !important;
    }
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
