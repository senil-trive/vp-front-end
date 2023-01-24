import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "../styles/theme";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>;
}
