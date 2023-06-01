import styled from "styled-components";

export const TrainigenHeroWrapper = styled.section`
  @media (max-width: 767px) {
    > div {
      height: 832px;
    }
  }
`;
export const TrainingBlogWrapper = styled.section`
  margin-top: -100px;
  .training-blog {
    position: relative;
    display: flex;
  }
  .training-blog article {
    margin-right: 22px;
    flex: 1;
  }
  .training-blog article:last-child {
    margin-right: 0;
  }
  @media (max-width: 991px) {
    .training-blog footer h4 {
      font-size: 34px;
    }
    .training-blog footer a {
      margin-top: 34px !important;
    }
    .blog-description p {
      line-height: 140%;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767px) {
    margin-top: -400px;
    .training-blog {
      flex-direction: column;
    }
    .training-blog article {
      margin-right: 0;
    }
    .training-blog article:last-child {
      margin-top: 20px;
    }
  }
`;
export const TrainigenIdealWrapper = styled.section`
  margin-top: 80px;
  .ideal-container {
    margin-bottom: -150px;
    z-index: 1;
  }
  @media (max-width: 767px) {
    .info-card-footer {
      line-height: 160%;
    }
    margin-top: 40px !important;
    .ideal-container {
      margin-bottom: -431px;
    }
  }
`;

export const PackageWrapper = styled.section`
  .package-container .card-container {
    margin-right: 20px;
    flex: 1;
  }
  .package-container .card-container footer {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .package-container .card-container footer .title,
  .description {
    color: #fff;
  }
  .package-container .card-container .description {
    margin-bottom: 20px;
  }
  .package-container .card-container .title {
    word-break: break-all;
  }
  .package-container .card-container footer a {
    margin-top: auto;
    background: #ffffff;
    border-radius: 12px;
    color: #ff971d;
  }
  .packagelist-item {
    display: flex;
  }
  .packagelist-item img {
    width: 20px;
    margin-right: 5px;
  }

  @media (max-width: 991px) {
    .package-container .card-container {
      width: calc(50% - 20px);
      flex: none;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 767px) {
    margin-top: 40px !important;
  }
  @media (max-width: 600px) {
    .package-container .card-container {
      width: calc(100% - 20px);
      flex: none;
    }
  }
`;
