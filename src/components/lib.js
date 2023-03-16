import styled from "styled-components";
import * as colors from "../styles/colors";
import * as typography from "../styles/typography";

const sizeVariants = {
  sm: { maxWidth: "700px" },
  md: { maxWidth: "900px" },
  lg: { maxWidth: "1000px" },
};

const Container = styled.div(
  {
    maxWidth: "1000px",
    marginInline: "auto",
    padding: "1em",
  },
  ({ size = "lg" }) => sizeVariants[size]
);

const Stack = styled.div(
  ({
    gap = "1em",
    justifyContent = "start",
    alignItems = "stretch",
    fullWidth = false,
  }) => ({
    display: "flex",
    width: fullWidth ? "100%" : "auto",
    flexWrap: "wrap",
    gap,
    justifyContent,
    alignItems,
  }),
  ({ direction = "row" }) =>
    direction === "column" && { flexDirection: "column" }
);

const StyledButton = styled.button(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.2em 1.5em",
    backgroundColor: colors.bgLight,
    border: "1px solid " + colors.border,
    borderRadius: "10px",
    color: colors.text,
    position: "relative",
    cursor: "pointer",
    height: "60px",
    transition: "ease 300ms border-color",
    ":hover, :focus": {
      zIndex: 10,
      outline: "unset",
      borderColor: colors.borderSelected,
    },
  },
  ({ selected = false }) =>
    selected && {
      backgroundColor: colors.bgSelected,
      color: colors.bg,
      borderColor: colors.borderSelected,
      ":hover": {
        borderColor: colors.border,
      },
    },
  ({ disabled = false }) =>
    disabled && {
      backgroundColor: colors.bgDisabled,
      color: colors.bg,
      cursor: "default",
      ":hover": {
        borderColor: colors.border,
      },
    },
  ({ isRounded = false }) =>
    isRounded && { borderRadius: "50%", aspectRatio: "1" },
  ({ isSquared = false }) => isSquared && { aspectRatio: "1" }
);

const StyledTextField = styled.div({
  position: "relative",
  width: "100%",
  display: "block",

  textarea: {
    resize: "none",
    minHeight: "250px",
    lineHeight: 2,
  },

  "input, textarea": {
    backgroundColor: colors.bgLight,
    fontSize: typography.text,
    border: "1px solid " + colors.border,
    borderRadius: "10px",
    height: "60px",
    marginBottom: "0.4rem",
    outline: "unset",
    padding: "1.2rem 1rem 0",
    color: colors.text,
    caretColor: colors.text,
    width: "100%",
    "&:focus": {
      borderColor: colors.borderSelected,
    },
    "&[aria-errormessage]": {
      borderColor: colors.error,
    },
    "&:autofill, &:-webkit-autofill": {
      transition: " background-color 9999s ease-in-out 0s",
      "-webkit-text-fill-color": colors.text,
    },
  },
  label: {
    position: "absolute",
    fontSize: typography.text,
    top: "31px",
    left: "1.2em",
    transform: "translateY(-50%)",
    transition: "ease 300ms top, ease 300ms font-size",
    color: colors.textDark,
    cursor: "text",
  },
  "input:required + label::after, textarea:required + label::after,": {
    content: '" *"',
  },
  "input:not(:placeholder-shown) + label, input:focus + label, textarea:not(:placeholder-shown) + label, textarea:focus + label":
    {
      top: "14px",
      fontSize: typography.textSm,
    },
  "&:focus-within": {
    zIndex: 100,
  },
  "&:has(input[aria-errormessage]), &:has(textarea[aria-errormessage])": {
    zIndex: 1,
  },
});

const directionVariants = {
  column: {
    flexDirection: "column",
    "& *": {
      marginBottom: "-1px",
    },
    "& *:not(:first-child), & *:not(:first-child) input": {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    "& *:not(:last-child), & *:not(:last-child) input": {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  row: {
    "& > *:not(:first-child)": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: "-1px",
    },
    " & > *:not(:first-child) > input ": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    "& > *:not(:last-child), & > *:not(:last-child) > input": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
};

const Group = styled.div(
  {
    display: "flex",
  },
  ({ direction = "row" }) => directionVariants[direction]
);

const Grid = styled.div(({ minWidth = "160px", gap = "20px" }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: ` repeat(auto-fill, minmax(${minWidth}, 1fr))`,
  gap: gap,
  gridAutoRows: "min-max(80px, auto)",
}));

const Card = styled.div(
  ({ padding = "1em", width }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding,
    backgroundColor: colors.bgLight,
    border: "1px solid " + colors.border,
    borderRadius: "10px",
    color: colors.text,
    width,
  }),
  ({ isSquared = false }) => isSquared && { aspectRatio: "1", height: "60px" }
);

const StyledErrorMessage = styled.div({
  color: colors.error,
  fontSize: typography.textSm,
});

const typographyVariants = {
  h1: { fontSize: typography.h1 },
  h2: { fontSize: typography.h2 },
  h3: { fontSize: typography.h3 },
  h4: { fontSize: typography.h4 },
  h5: { fontSize: typography.h5 },
  h6: { fontSize: typography.h6 },
  p: { fontSize: typography.text },
  pSm: { fontSize: typography.textSm },
  pLg: { fontSize: typography.textLg },
};
const StyledTypography = styled.p(
  ({ variant }) => ({
    color: colors.text,
    ".react-loading-skeleton": {
      width: `calc(${typography.h1} * 6)`,
    },
  }),
  ({ variant }) => typographyVariants[variant],
  ({ isSecondary = false }) => (isSecondary ? { color: colors.textDark } : {})
);

const Tag = styled.div({
  backgroundColor: " #d9232e",
  padding: "2px 6px",
  borderRadius: "5px",
});

const Spinner = styled.div({
  border: "2px solid rgb(40, 40, 40)",
  borderTop: "2px rgb(108, 108, 108) solid",
  borderRadius: "50%",
  height: "16px",
  width: "16px",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

export {
  Container,
  StyledErrorMessage,
  Stack,
  StyledButton,
  StyledTextField,
  Group,
  Grid,
  Card,
  StyledTypography,
  Tag,
  Spinner,
};
