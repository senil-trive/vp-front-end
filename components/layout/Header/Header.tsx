import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSubmenu from "./HeaderSubmenu/HeaderSubmenu";
import SearchBar from "../../form/SearchBar/SearchBar";
import MenuIcon from "../../icons/MenuIcon/MenuIcon";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import HeaderSubmenuMobile from "./HeaderSubmenuMobile/HeaderSubmenuMobile";
import Link from "next/link";
import { getMenuItems } from "../../../utils/api";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";

export type MenuItem = {
  id: string;
  name: string;
  children: ChildMenuItem[];
};

export type ChildMenuItem = {
  id: string;
  name: string;
  children: GrandChildMenuItem[];
};

export type GrandChildMenuItem = {
  id: string;
  name: string;
  link: string;
};

const StyledHeader = styled.header`
  position: relative;

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
  const [isLoading, setIsloading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [selected, setSelected] = useState<MenuItem | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = (menu: MenuItem) => {
    if (selected?.id === menu.id) {
      return setSelected(() => undefined);
    }

    return setSelected(() => menu);
  };

  useEffect(() => {
    if (menuItems.length === 0 && isLoading) {
      (async () => {
        const data = await getMenuItems();
        setMenuItems(data);
        setIsloading(false);
      })();
    }
  }, []);

  return (
    <StyledHeader>
      <div className="desktop-menu">
        <div className="inner">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            {!isLoading && (
              <HeaderNav
                menuCols={menuItems}
                selected={selected}
                onChange={(x) => toggleMenu(x)}
              />
            )}
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
        {selected && <HeaderSubmenu categories={selected?.children} />}
      </div>
      <div className="mobile-menu">
        <div className="inner">
          <div>
            <Logo />
          </div>
          <div>
            {!isLoading && (
              <div className="flex items-center gap-[24px]">
                <Link href="/search">
                  <SearchIcon />
                </Link>
                <button
                  style={{ border: "none", backgroundColor: "white" }}
                  onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            )}
          </div>
        </div>
        {mobileMenuOpen && (
          <HeaderSubmenuMobile
            menuCols={menuItems}
            selected={selected}
            onChange={(x) => toggleMenu(x)}
          />
        )}
      </div>
    </StyledHeader>
  );
}
