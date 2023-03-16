import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import logo from "assets/logo.png";
import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown/Dropdown";
import { FullPageErrorFallback } from "components/Error/FullPageErrorFallback";
import { Card, Container, Stack } from "components/lib";
import { Typography } from "components/Typography";
import { ErrorBoundary } from "react-error-boundary";
import { Link, NavLink, Outlet } from "react-router-dom";
import { menuRoutes, privateRoutes } from "utils/routes";
import { HeaderWrapper } from "./HeaderWrapper";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "context/auth";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function Header() {
  const { user, logout } = useAuth();
  const { reset } = useQueryErrorResetBoundary();

  const handleClick = async () => {
    await logout();
  };

  return (
    <HeaderWrapper>
      <Container>
        <Stack justifyContent="space-between">
          <Stack alignItems="center">
            <Link to={privateRoutes.DISCOVER} aria-label="Home">
              <img src={logo} alt="" className="logo" />
            </Link>
            <Stack as="nav" className="nav" aria-label="Main menu">
              <Stack as="ul">
                {menuRoutes.map((route, i) => (
                  <NavLink
                    key={i}
                    to={route.link}
                    className="nav__link"
                    style={({ isActive }) => ({
                      ...(isActive ? { color: "white" } : null),
                    })}
                  >
                    {route.text}
                  </NavLink>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Dropdown>
              <Dropdown.Trigger>
                {(isOpen) => (
                  <Stack as="button" alignItems="center" gap="0.4rem">
                    <div className="avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="avatar__arow">
                      {isOpen ? <BsChevronUp /> : <BsChevronDown />}
                    </div>
                  </Stack>
                )}
              </Dropdown.Trigger>
              <Dropdown.Contents>
                <Card>
                  <Typography>Hola</Typography>
                  <Typography isSecondary>Que tal</Typography>
                </Card>
                <Button onClick={handleClick}>Logout</Button>
              </Dropdown.Contents>
            </Dropdown>
            <MobileMenu />
          </Stack>
        </Stack>
      </Container>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback} onReset={reset}>
        <Outlet />
      </ErrorBoundary>
    </HeaderWrapper>
  );
}
export { Header };
