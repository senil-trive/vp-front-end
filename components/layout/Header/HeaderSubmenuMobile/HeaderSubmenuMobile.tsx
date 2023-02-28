import React, { useState } from "react";
import styled from "styled-components";
import { MENU_COLS } from "../../../../constants/mockData";
import ChevronDown from "../../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../../icons/ChevronUp/ChevronUp";
import { P } from "../../../typography";
import { MenuItem } from "../Header";

type Props = {
  selected?: MenuItem;
  menuCols: MenuItem[];
  onChange: (x: MenuItem) => void;
};

const Wrapper = styled.div`
  flex: 1;
  padding: 32px 64px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  border-radius: 8px;
  position: absolute;
  top: 10px;

  position: absolute;
  top: calc(100% + 5px);
  z-index: 999;
  right: 5px;

  ul {
    list-style: none;
    padding: 0;
  }

  > ul {
    > li {
      padding: 12px 0;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin: 0;
        }
      }

      &.with-divider {
        border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
      }
    }

    .items {
      max-height: 1px;
      overflow: hidden;
      transition: 0.3s ease-in-out;
    }

    .selected {
      .header p {
        color: ${({ theme }) => theme.colors.primary};
      }
      .items {
        max-height: 99px;
      }
    }
  }
`;

export default function HeaderSubmenuMobile({
  selected,
  onChange,
  menuCols = MENU_COLS,
}: Props) {
  const generateColClass = (
    currentId: string,
    index: number,
    selectedId?: string
  ) => {
    let className = "";

    if (selectedId === currentId) className = `${className} selected`;
    if (index < menuCols.length - 1) className = `${className} with-divider`;

    return className;
  };

  return (
    <Wrapper>
      <ul>
        {menuCols.map((menu, index) => (
          <li
            key={menu.id}
            className={generateColClass(menu.id, index, selected?.id)}
            onClick={() => onChange(menu)}
          >
            <div className="header">
              <P variant="bold" className="mr-2">
                {menu.name}
              </P>{" "}
              {selected?.id === menu.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            <ul key={index} className="items">
              {menu.children.map((category, index) => (
                <>
                  {category.children.map((item) => (
                    <li key={item.link}>
                      <P>
                        <a href={item.link}>{item.name}</a>
                      </P>
                    </li>
                  ))}
                </>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}