import React, { ReactNode } from "react";
import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

import Button from "../../buttons/Button";
import { P } from "../../typography";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import bg from "../../../public/chatBg.png";

const StyledForumPost = styled.article`
  &:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.25;
    background: url("/chatBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 1;
  }
  cursor: pointer;
  background-color: rgba(255, 151, 29, 1);
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;

  /* TODO: required for the home grid */
  min-height: 624px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
  }

  .content {
    margin-bottom: 30px;
    z-index: 5;
    > div {
      display: flex;
      gap: 8px;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    .likes {
      display: flex;
      gap: 5.55px;
    }
    p {
      margin: 0;
    }
  }
`;

type ChatItem = {
  dir: "to" | "from";
  person: string;
  message: string;
};

const convo: ChatItem[] = [
  {
    dir: "from",
    person: "Jij",
    message:
      "Hoiii!! Ik ben nu bij mama en als ik ga slapen dan mis ik papa weer heel erg...",
  },
  {
    dir: "to",
    person: "Matthijs",
    message:
      "Ohh ja dat heb ik ook echt vaak gehad! Dat is echt geen fijn gevoel he :confused: Dan wil je eigenlijk van papa even een dikke knuffel maar dan kan het niet. Weet je wat mij dan hielp? Papa's shirt meenemen als ik naar mama ging en dan had hij zijn luchtje erop gespoten en ging ik daar lekker mee slapen :heart: Misschien kan je dat ook eens proberen?",
  },
];

function ChatBubble({
  from,
  children,
  isLeft,
}: {
  from: string;
  children: ReactNode;
  isLeft: boolean;
}) {
  return (
    <div
      className="flex flex-col max-w-[75%]"
      style={{
        alignSelf: isLeft ? "flex-start" : "flex-end",
      }}
    >
      <P
        color="success"
        style={{
          textAlign: isLeft ? "left" : "right",
          margin: 0,
          color: "#fff",
          fontWeight: 500,
        }}
      >
        {from}
      </P>
      <div className="bg-white p-3 w-fit rounded-lg font-light text-[#150F2F] font-[Avenir]">
        {children}
      </div>
    </div>
  );
}

export default function ChatExampleItem() {
  return (
    <StyledForumPost>
      <div className="z-10">
        <header>
          <UserAvatar
            size="md"
            alt="villa pinedo"
            src="/android-chrome-192x192.png"
          />
          <div>
            <P
              color="success"
              style={{ margin: 0, fontWeight: 700, color: "#fff" }}
            >
              Buddy
            </P>
            <P style={{ margin: 0, fontWeight: 300, color: "#fff" }}>
              Matthijs, 18 jaar
            </P>
          </div>
        </header>
        <div className="flex flex-col content max-h-[390px] overflow-y-auto">
          {convo.map((item, index) => (
            <ChatBubble
              key={index}
              from={item.person}
              isLeft={item.dir === "from"}
            >
              {item.message}
            </ChatBubble>
          ))}
        </div>
      </div>
      <footer className="chat_btn">
        <Button variant="success" href="/vrijwilligerswerk/buddy-programma">
          Nu Chatten
        </Button>
      </footer>
    </StyledForumPost>
  );
}
