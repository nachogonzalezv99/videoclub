import logo from "assets/logo.png";
import { Button, Card, Group, Stack, TextField, Typography } from "components";
import { ErrorMessage } from "components/Error/ErrorMessage";
import { useAuth } from "context/auth";
import { useAsync } from "hooks/useAsync";
import { BsFillLockFill, BsFillPersonFill } from "react-icons/bs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "utils/routes";
import { AuthorizeWrapper } from "./AuthorizeWrapper";
import { useFormik } from "formik";
import { authorizeSchema } from "./authorizeSchema";

function Register() {
  const { isLoading, isError, error, run } = useAsync();
  const { register, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/discover";

  const onSubmit = async () => {
    await run(register(values));
    navigate(from, { replace: true });
  };

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: authorizeSchema,
    onSubmit: onSubmit,
  });

  if (user) {
    return <Navigate to={privateRoutes.DISCOVER} replace />;
  }

  return (
    <AuthorizeWrapper>
      <img src={logo} className="logo" alt="logo" />
      <Card
        padding="2.5em"
        width="30em"
        as="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Typography component="h2">Register</Typography>

        <Stack direction="column" gap=".3em" fullWidth>
          <Group>
            <Card as="label" htmlFor="username" isSquared>
              <BsFillPersonFill />
            </Card>
            <TextField
              id="username"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              label="Username"
              required={true}
              error={
                touched.username && errors.username ? errors.username : null
              }
            />
          </Group>

          <Group>
            <Card as="label" htmlFor="password" isSquared>
              <BsFillLockFill />
            </Card>
            <TextField
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              label="Password"
              error={
                touched.password && errors.password ? errors.password : null
              }
            />
          </Group>

          {isError && <ErrorMessage error={error.message} />}

          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
          <Stack gap=".5em" justifyContent="center" className="bottomLink">
            <Typography isSecondary> Already have an account?</Typography>
            <Link to={publicRoutes.LOGIN}> Log in</Link>
          </Stack>
        </Stack>
      </Card>
    </AuthorizeWrapper>
  );
}
export { Register };
