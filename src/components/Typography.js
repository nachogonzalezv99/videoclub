import Skeleton from "react-loading-skeleton";
import { StyledTypography } from "./lib";

function Typography({
  variant,
  component = "p",
  children,
  isLoading,
  count = 1,
  ...props
}) {
  if (!variant) variant = component;
  return (
    <StyledTypography as={component} variant={variant} {...props}>
      {isLoading ? (
        <Skeleton
          count={component === "p" ? count : 1}
          width={component === "p" && "100%"}
        />
      ) : (
        children
      )}
    </StyledTypography>
  );
}
export { Typography };
