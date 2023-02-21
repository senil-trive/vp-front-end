import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSubmenu from "./HeaderSubmenu/HeaderSubmenu";
import SearchBar from "../../form/SearchBar/SearchBar";
import MenuIcon from "../../icons/MenuIcon/MenuIcon";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import HeaderSubmenuMobile from "./HeaderSubmenuMobile/HeaderSubmenuMobile";
import Link from "next/link";

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
  position: relative;

  /* Header Sub Menu */
  .inner + div {
    position: absolute;
    top: 100%;
    z-index: 999;
    right: 0;
  }

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

  .mobile-menu {
    display: block;
    width: 100%;
  }

  .desktop-menu {
    display: none;
    .inner + div {
      width: 100%;
    }
  }
  @media ${({ theme }) => theme.devices.laptop} {
    .mobile-menu {
      display: none;
    }
    .desktop-menu {
      display: block;
    }
  }
`;

export default function Header() {
  const [selected, setSelected] = useState<MenuItem | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = (menu: MenuItem) => {
    if (selected?.id === menu.id) {
      return setSelected(() => undefined);
    }

    return setSelected(() => menu);
  };

  return (
    <StyledHeader>
      <div className="desktop-menu">
        <div className="inner">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <HeaderNav selected={selected} onChange={(x) => toggleMenu(x)} />
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
        {selected && <HeaderSubmenu categories={selected?.categories} />}
      </div>
      <div className="mobile-menu">
        <div className="inner">
          <div>
            <Logo />
          </div>
          <div>
            <SearchIcon />
            <MenuIcon onClick={() => setMobileMenuOpen((isOpen) => !isOpen)} />
          </div>
        </div>
        {mobileMenuOpen && <HeaderSubmenuMobile />}
      </div>
    </StyledHeader>
  );
}
