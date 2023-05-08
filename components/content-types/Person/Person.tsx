import React from "react";
import styled from "styled-components";
import { ColorType } from "../../../types/colorTypes";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import { P } from "../../typography";

type Props = {
  age?: string;
  name: string;
  avatar?: string;
  size?: "sm" | "md";
  color?: ColorType;
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .profile-meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export default function Person({
  age,
  name,
  size = "sm",
  color,
  avatar,
}: Props) {
  return (
    <StyledWrapper>
      {avatar && (
        <div className="profile-img">
          <UserAvatar src={avatar} alt={name} size={size} />
        </div>
      )}
      <div className="profile-meta">
        <P variant="bold" color={color}>
          Buddy
        </P>
        {name}
        {age && (
          <P color={color}>{age.includes("jaar") ? age : `${age} jaar`} </P>
        )}
      </div>
    </StyledWrapper>
  );
}
