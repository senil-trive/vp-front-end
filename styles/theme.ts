import { DefaultTheme } from "styled-components";

export const COLORS = {
  primary: "#000000",
  secondary: "#06D6A0",
  tertiary: "#3BBBDE",
  text: "#444444",
  white: "#fff",
  black: "#000",
  error: "#FA5400",
  success: "#06D6A0",
  info: "orange",
};

export const SHADOWS = {
  cardDefault: "0px 4px 25px 0px rgba(0, 0, 0, 0.1)",
  cardHover: "0px 4px 25px 0px rgba(0, 0, 0, 0.2)",
};

export const FONT_SIZES = {
  heading1: {
    mobile: "44px",
    desktop: "72px",
  },
  heading2: {
    mobile: "2rem",
    desktop: "2rem",
  },
  heading3: {
    mobile: "1.5rem",
    desktop: "1.5rem",
  },
  heading4: {
    mobile: "1.25rem",
    desktop: "1.25rem",
  },
  heading5: {
    mobile: "1rem",
    desktop: "1rem",
  },
  paragraph: {
    mobile: "1rem",
    desktop: "18px",
  },
};

export const BREAKPOINTS = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 410,
  tablet: 768,
  laptop: 1024,
  carouselLaptop: 1130,
  laptopL: 1440,
  desktop: 1800,
  desktopL: 2560,
};

export const DEVICES = {
  mobileS: `(min-width: ${BREAKPOINTS.mobileS}px)`,
  mobileM: `(min-width: ${BREAKPOINTS.mobileM}px)`,
  mobileL: `(min-width: ${BREAKPOINTS.mobileL}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  laptop: `(min-width: ${BREAKPOINTS.laptop}px)`,
  carouselLaptop: `(min-width: ${BREAKPOINTS.carouselLaptop}px)`,
  laptopL: `(min-width: ${BREAKPOINTS.laptopL}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  desktopL: `(min-width: ${BREAKPOINTS.desktop}px)`,
};

export const DEFAULT_THEME: DefaultTheme = {
  name: "default",
  colors: COLORS,
  shadows: SHADOWS,
  fontSizes: FONT_SIZES,
  breakpoints: BREAKPOINTS,
  devices: DEVICES,
};
