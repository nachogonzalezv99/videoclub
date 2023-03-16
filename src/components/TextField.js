import { ErrorMessage } from "./Error/ErrorMessage";
import { StyledTextField } from "./lib";

function TextField({ label, id, error, textarea, ...props }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <>
      <StyledTextField>
        {textarea ? (
          <textarea
            name={id}
            id={id}
            aria-errormessage={errorId}
            placeholder=" "
            {...props}
          />
        ) : (
          <input
            name={id}
            id={id}
            aria-errormessage={errorId}
            placeholder=" "
            {...props}
          />
        )}

        <label htmlFor={id}>{label || id}</label>
        {error ? <ErrorMessage id={errorId} error={error.message} /> : null}
      </StyledTextField>
    </>
  );
}
export { TextField };
