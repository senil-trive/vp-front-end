import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      primaryTransparent: string;
      secondary: string;
      secondaryTransparent: string;
      tertiary: string;
      tertiaryTransparent: string;
      text: string;
      white: string;
      grey: string;
      black: string;
      error: string;
      success: string;
      info: string;
      infoTransparent: string;
      infoReversed: string;
    };
    shadows: {
      sm: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    fontSizes: {
      h1: {
        mobile: string;
        desktop: string;
      };
      h2: {
        mobile: string;
        desktop: string;
      };
      h3: {
        mobile: string;
        desktop: string;
      };
      h4: {
        mobile: string;
        desktop: string;
      };
      h5: {
        mobile: string;
        desktop: string;
      };
      p: {
        mobile: string;
        desktop: string;
      };
    };
    breakpoints: {
      mobileS: number;
      mobileM: number;
      mobileL: number;
      tablet: number;
      laptop: number;
      carouselLaptop: number;
      laptopL: number;
      desktop: number;
      desktopL: number;
    };
    devices: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tablet: string;
      laptop: string;
      carouselLaptop: string;
      laptopL: string;
      desktop: string;
      desktopL: string;
    };
  }
}
