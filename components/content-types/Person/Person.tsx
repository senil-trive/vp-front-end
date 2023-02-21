import { ValueOf } from "next/dist/shared/lib/constants";
import Image from "next/image";
import React from "react";
import { IoMdPerson } from "react-icons/io";
import styled from "styled-components";
import { COLORS } from "../../../styles/theme";
import IconButton from "../../buttons/IconButton/IconButton";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import { P } from "../../typography";

type Props = {
  age: number;
  name: string;
  avatar?: string;
  size?: "sm" | "md";
  type: string;
  color: string;
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
      <div className="profile-img">
        {avatar ? (
          <UserAvatar src={avatar} alt={name} size={size} />
        ) : (
          <IconButton
            wrapperSize={size === "md" ? 64 : 32}
            iconSize={size === "md" ? 32 : 16}
            wrapperColor="#E0E0E0"
            Icon={IoMdPerson}
          />
        )}
      </div>
      <div className="profile-meta">
        <P variant="bold" style={{ color }}>
          {type}
        </P>
        <P>
          {name} {age ? age + ", jaar" : ""}
        </P>
      </div>
    </StyledWrapper>
  );
}
