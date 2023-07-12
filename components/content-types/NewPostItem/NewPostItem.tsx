import React from "react";
import styled from "styled-components";
import Tag from "../../buttons/Tag/Tag";
import Button from "../../buttons/Button";
import { ColorType } from "../../../types/colorTypes";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import { P } from "../../typography";

type Props = {
  title?: string;
  description?: string;
  bgImg: string;

  buttonText?: string;
  color?: ColorType;
};

const StyledWrapper = styled.div<{ bgImg: string }>`
  display: flex;
  align-items: baseline;
  height: 100%;
  width: 100%;
  gap: 16px;
  border-radius: 8px;

  color: white;

  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  /* Additional background styles can be applied here */

  .profile-meta {
    display: flex;
    align-items: start;
    font-size: 32px;
    gap: 335px;
    flex-direction: column;
    padding: 36px;
  }
  h3,
  h4,
  h5,
  h6,
  p {
    color: inherit;
    text-align: left;
  }
  p {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    .profile-meta {
      font-size: 16px !important;
    }
  }
`;

export default function NewPostItem({
  title,

  description,
  buttonText,
  bgImg,
}: Props) {
  return (
    <StyledWrapper bgImg={bgImg}>
      <div className="profile-meta">
        {buttonText && (
          <Tag variant="dark" size="m">
            {buttonText}
          </Tag>
        )}
        <div className="custom_new_post">
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </StyledWrapper>
  );
}
