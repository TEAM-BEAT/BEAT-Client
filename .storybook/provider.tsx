import { ThemeProvider } from "styled-components";
import theme from "../src/styles/theme";
import React, { ReactNode } from "react";
import GlobalStyle from "../src/styles/global";

interface ProviderProps {
  children?: ReactNode;
  theme?: unknown;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
