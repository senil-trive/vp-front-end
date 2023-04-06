import { ValueOf } from "next/dist/shared/lib/constants";
import Image from "next/image";
import React from "react";
import { IoMdPerson } from "react-icons/io";
import styled from "styled-components";
import { COLORS } from "../../../styles/theme";
import { ColorType } from "../../../types/colorTypes";
import IconButton from "../../buttons/IconButton/IconButton";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import { P } from "../../typography";

type Props = {
  age?: string;
  name: string;
  avatar?: string;
  size?: "sm" | "md";
  type: string;
  color: ColorType;
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
  type,
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
          {name}
        </P>
        {age && (
          <P color={color}>{age.includes("jaar") ? age : `${age} jaar`} </P>
        )}
      </div>
    </StyledWrapper>
  );
}
