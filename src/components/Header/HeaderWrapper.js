import styled from "styled-components";
import * as colors from "../../styles/colors";

export const HeaderWrapper = styled.div({
  ".logo ": {
    width: "130px",
    marginRight: "40px",
  },
  ".nav": {
    textTransform: "uppercase",

    "&__link": {
      color: colors.textDark,
      fontize: "14px",
    },
    "@media only screen and (max-width: 600px)": {
      display: "none",
    },
  },
});
