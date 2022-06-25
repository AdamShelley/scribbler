import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  minHeight: "80vh",
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
