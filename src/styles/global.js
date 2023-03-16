import { createGlobalStyle } from "styled-components";
import * as colors from "./colors";
import * as typography from "./typography";

const GlobalStyle = createGlobalStyle({
  " *,*::before,*::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: colors.bg,
    fontSize: typography.text,
    fontFamily: "Roboto",
    color: colors.text,
    boxSizing: "border-box",
  },
  "h1, h2, h3, h4, h5, h6": {
    marginTop: 0,
    fontWeight: 400,
    marginBottom: "0.7em",
  },
  img: {
    width: "100%",
  },
  button: {
    backgroundColor: "unset",
    border: "unset",
    color: colors.text,
  },
  a: {
    color: colors.text,
  },
});

export default GlobalStyle;
