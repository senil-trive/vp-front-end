import React, { useState } from "react";
import styled from "styled-components";
import { MENU_COLS } from "../../../../constants/mockData";
import ChevronDown from "../../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../../icons/ChevronUp/ChevronUp";
import { P } from "../../../typography";
import { MenuItem } from "../Header";

const Wrapper = styled.div`
  flex: 1;
  padding: 32px 64px;
  background-color: #ededed;
  display: flex;

  ul {
    list-style: none;
    padding: 0;
  }

  > ul {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .items {
      max-height: 1px;
      overflow: hidden;
      transition: 0.3s ease-in-out;
    }

    .selected .items {
      max-height: 99px;
    }
  }
`;

export default function HeaderSubmenuMobile() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <Wrapper>
      <ul>
        {MENU_COLS.map((menu) => (
          <li
            key={menu.id}
            className={selected?.id === menu.id ? "selected" : ""}
            onClick={() => setSelected(menu)}
          >
            <div className="header">
              <P variant="bold" className="mr-2">
                {menu.name}
              </P>{" "}
              {selected?.id === menu.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            {menu.categories.map((category, index) => (
              <ul key={index} className="items">
                {category.items.map((item) => (
                  <li key={item.link}>
                    <P>
                      <a href={item.link}>{item.name}</a>
                    </P>
                  </li>
                ))}
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
