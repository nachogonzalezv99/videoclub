import { StyledErrorMessage } from "components/lib";

function ErrorMessage({ error, ...props }) {
  return (
    <StyledErrorMessage role="alert" {...props}>
      {error}
    </StyledErrorMessage>
  );
}
export { ErrorMessage };
