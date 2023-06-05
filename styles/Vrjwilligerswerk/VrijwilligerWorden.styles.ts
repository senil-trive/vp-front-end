import styled from "styled-components";

export const PeopleWrapper = styled.section`
  margin: 80px 0;
  .people-container {
    margin: auto;
  }
  .people-container .card-container {
    width: calc(25% - 22px) !important;
    margin-right: 22px;
  }
  .card-container {
    margin-right: 22px;
  }
  .card-container .title,
  .description {
    color: #fff;
  }
  .card-container .title {
    font-size: 25px;
  }
  @media (max-width: 991px) {
    .people-container .card-container {
      width: calc(50% - 22px) !important;
      margin-right: 22px;
      margin-bottom: 22px;
    }
  }
  @media (max-width: 767px) {
    margin: 40px 0;
    .card-container .title {
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    .card-container footer {
      padding: 20px;
    }
    .card-container .title {
      font-size: 20px;
      margin: 0;
    }
    .people-container .card-container img {
      object-fit: fill !important;
    }
  }
  @media (max-width: 600px) {
    .people-container .card-container {
      width: 100% !important;
      margin-right: 0;
      margin-bottom: 22px;
    }
    .people-container .card-container header {
      height: 250px;
    }
  }
`;
export const VideoWrapper = styled.section`
  .video-container figure {
    width: calc(33.33% - 22px) !important;
    margin-right: 22px;
  }

  @media (max-width: 991px) {
    .video-container figure {
      height: 500px !important;
    }
    .video-container figure > div > div {
      height: 60px !important;
      width: 60px !important;
    }
    .video-container figcaption h3 {
      font-size: 23px;
    }
    .video-container figcaption p {
      line-height: 130%;
    }
  }
  @media (max-width: 767px) {
    margin-top: 40px;
    .video-container figure {
      width: 100% !important;
      height: 471px !important;
      margin: 20px 0px;
    }
  }
`;