import React from "react";
import styled from "styled-components";
import ChevronDown from "../../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../../icons/ChevronUp/ChevronUp";
import { P } from "../../../typography";
import { MenuItem } from "../Header";
import { menuCols } from "../Header.data";

type Props = {
  selected?: MenuItem;
  onChange: (x: MenuItem) => void;
};

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;

    li {
      display: flex;
      align-items: center;
      margin-right: 52px;
      cursor: pointer;

      p {
        margin-right: 16px;
      }

      &.selected {
        font-weight: 700;
      }
    }
  }
`;

export default function HeaderNav({ selected, onChange }: Props) {
  return (
    <StyledNav>
      <ul>
        {menuCols.map((menu) => (
          <li
            key={menu.id}
            className={selected?.id === menu.id ? "selected" : ""}
            onClick={() => onChange(menu)}
          >
            <P className="mr-2">{menu.name}</P>{" "}
            {selected?.id === menu.id ? <ChevronUp /> : <ChevronDown />}
          </li>
        ))}
      </ul>
    </StyledNav>
  );
}
