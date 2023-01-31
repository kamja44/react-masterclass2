import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { ThemeProvider } from "styled-components";
const darkTheme = {
  textColor: "white",
  backgroundColor: "#111",
};
const lightTheme = {
  textColor: "#111",
  backgroundColor: "white",
};
ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
