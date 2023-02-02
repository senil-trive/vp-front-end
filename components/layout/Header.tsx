import React, { useState } from "react";
import styled from "styled-components";
import ChevronDown from "../icons/ChevronDown/ChevronDown";
import ChevronUp from "../icons/ChevronUp/ChevronUp";
import Logo from "../icons/Logo/Logo";
import { P } from "../typography/Typography";

type MenuItem = {
  id: string;
  name: string;
  categories: Category[];
};

type Category = {
  name: string;
  items: {
    name: string;
    link: string;
  }[];
};

const menuCols: MenuItem[] = [
  {
    id: "1",
    name: "Menu Item",
    categories: [
      {
        name: "Category",
        items: [
          {
            name: "Menu item c1 1",
            link: "#menuItem",
          },
          {
            name: "Menu item c1 2",
            link: "#menuItem",
          },
          {
            name: "Menu item c1 3",
            link: "#menuItem",
          },
          {
            name: "Menu item c1 4",
            link: "#menuItem",
          },
        ],
      },
      {
        name: "Category",
        items: [
          {
            name: "Menu item c2 1",
            link: "#menuItem",
          },
          {
            name: "Menu item c2 2",
            link: "#menuItem",
          },
          {
            name: "Menu item c2 3",
            link: "#menuItem",
          },
          {
            name: "Menu item c2 4",
            link: "#menuItem",
          },
        ],
      },
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 2",
            link: "#menuItem",
          },
          {
            name: "Menu item 3",
            link: "#menuItem",
          },
          {
            name: "Menu item 4",
            link: "#menuItem",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Menu Item",
    categories: [
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
        ],
      },
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
        ],
      },
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Menu Item",
    categories: [
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
        ],
      },
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
        ],
      },
      {
        name: "Category",
        items: [
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
          {
            name: "Menu item 1",
            link: "#menuItem",
          },
        ],
      },
    ],
  },
];

export default function Header() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const toggleMenu = (menu: MenuItem) => {
    if (selected?.id === menu.id) {
      return setSelected(() => null);
    }

    return setSelected(() => menu);
  };

  return (
    <header>
      <div className="flex justify-between items-center shadow-md py-[12px] px-[41px]">
        <div className="flex items-center">
          <Logo className="mr-[52px]" />
          <nav>
            <ul className="flex items-center">
              {menuCols.map((menu) => (
                <li
                  key={menu.id}
                  className={`mr-[52px] flex items-center ${
                    selected?.id === menu.id ? "font-bold" : ""
                  }`}
                  onClick={() => toggleMenu(menu)}
                >
                  <P className="mr-2">{menu.name}</P>{" "}
                  {selected?.id === menu.id ? <ChevronUp /> : <ChevronDown />}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <div className="px-[12px] py-[10px] border">Searchbox</div>
        </div>
      </div>
      {selected && (
        <div
          className="flex-1 py-[32px] px-[64px]"
          style={{ background: "#ededed" }}
        >
          <ul className="flex">
            {selected?.categories.map((category, index) => (
              <div key={index} className="mr-16">
                <li>
                  <P variant="bold">{category.name}</P>
                </li>
                {category.items.map((item) => (
                  <li key={item.link}>
                    <P>
                      <a href={item.link}>{item.name}</a>
                    </P>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
