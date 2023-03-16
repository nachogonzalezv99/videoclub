import { Header } from "components/Header/Header";
import { useAuth } from "context/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { publicRoutes } from "utils/routes";

function ProtectedRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Header>
      <Outlet />
    </Header>
  ) : (
    <Navigate to={publicRoutes.LOGIN} state={{ from: location }} replace />
  );
}

export { ProtectedRoutes };
