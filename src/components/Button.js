import { Spinner, StyledButton } from "./lib";

function Button({ isLoading, disabled, children, ...props }) {
  return (
    <StyledButton disabled={disabled || isLoading} {...props}>
      {isLoading ? <Spinner aria-label="loading" /> : children}
    </StyledButton>
  );
}
export { Button };
