import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      text: string;
      white: string;
      black: string;
      error: string;
      success: string;
      info: string;
    };
    shadows: any;
    fontSizes: {
      heading1: {
        mobile: string;
        desktop: string;
      };
      heading2: {
        mobile: string;
        desktop: string;
      };
      heading3: {
        mobile: string;
        desktop: string;
      };
      heading4: {
        mobile: string;
        desktop: string;
      };
      heading5: {
        mobile: string;
        desktop: string;
      };
      paragraph: {
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
