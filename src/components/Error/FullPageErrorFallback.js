import { Button } from "components/Button";
import { Stack } from "components/lib";
import { Typography } from "components/Typography";
function FullPageErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      style={{ width: "600px", marginInline: "auto" }}
    >
      <Typography component="h1">Whooops!</Typography>
      <Typography isSecondary>{error.message}</Typography>
      <Button onClick={() => resetErrorBoundary()}>Try Again</Button>
    </Stack>
  );
}
export { FullPageErrorFallback };
