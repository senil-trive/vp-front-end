import React from "react";
import { IoMdPerson } from "react-icons/io";
import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

import Button from "../../buttons/Button";
import IconButton from "../../buttons/IconButton/IconButton";
import { P } from "../../typography";

const StyledForumPost = styled.article`
  background: ${({ theme }) => hexToRgba(theme.colors.success, 0.1)};
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
    > div {
      display: flex;
      gap: 8px;
      margin-bottom: 30px;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .likes {
      display: flex;
      gap: 5.55px;
    }
    p {
      margin: 0;
    }
  }
`;

export default function ChatExampleItem() {
  return (
    <StyledForumPost>
      <div>
        <header>
          <IconButton
            wrapperSize={64}
            wrapperColor="#E0E0E0"
            Icon={IoMdPerson}
          />
          <div>
            <P color="success" style={{ margin: 0, fontWeight: 500 }}>
              Buddy
            </P>
            <P style={{ margin: 0, fontWeight: 300 }}>Mathijs, 18 jaar</P>
          </div>
        </header>
        <div className="content"></div>
      </div>
      <footer>
        <Button
          variant="success"
          style={{ backgroundColor: "#3FC7B4" }}
          href="/vrijwilligerswerk/buddy-programma"
        >
          Nu Chatten
        </Button>
      </footer>
    </StyledForumPost>
  );
}
