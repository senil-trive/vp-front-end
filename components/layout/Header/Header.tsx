import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../form/Input/Input";
import Logo from "../../icons/Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSubmenu from "./HeaderSubmenu/HeaderSubmenu";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import SearchBar from "../../form/SearchBar/SearchBar";

export type MenuItem = {
  id: string;
  name: string;
  categories: Category[];
};

export type Category = {
  name: string;
  items: {
    name: string;
    link: string;
  }[];
};

const StyledHeader = styled.header`
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 41px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

    > div {
      display: flex;
      align-items: center;
    }
  }
`;

export default function Header() {
  const [selected, setSelected] = useState<MenuItem | undefined>(undefined);

  const toggleMenu = (menu: MenuItem) => {
    if (selected?.id === menu.id) {
      return setSelected(() => undefined);
    }

    return setSelected(() => menu);
  };

  return (
    <StyledHeader>
      <div className="inner">
        <div>
          <Logo className="mr-[52px]" />
          <HeaderNav selected={selected} onChange={(x) => toggleMenu(x)} />
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      {selected && <HeaderSubmenu categories={selected?.categories} />}
    </StyledHeader>
  );
}
