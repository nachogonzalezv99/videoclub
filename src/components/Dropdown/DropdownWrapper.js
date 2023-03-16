import styled from "styled-components";
import * as zIndex from "../../styles/zIndex";

export const DropdownWrapper = styled.nav({
  position: "relative",
  ".avatar": {
    backgroundColor: "rgb(255, 111, 111)",
    borderRadius: " 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "39px",
    height: "39px",
    padding: 0,
    fontSize: "19px",
    fontWeight: 400,
    "&__arrow": {
      marginLeft: "5px",
      fontSize: "18px",
    },
  },
  ".dropdown__content": {
    position: "absolute",
    width: "300px",
    right: 0,
    top: "55px",
    zIndex: zIndex.dropdown,
  },
});
