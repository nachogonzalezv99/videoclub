import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FullPageErrorFallback } from "components/Error/FullPageErrorFallback";
import { AuthProvider } from "context/auth";
import { Login } from "pages/Authorize/Login";
import { ProtectedRoutes } from "pages/Authorize/ProtectedRoutes";
import { Register } from "pages/Authorize/Register";
import { Discover } from "pages/Discover";
import { Finished } from "pages/Finished";
import { List } from "pages/List";
import { Movie } from "pages/Movie/Movie";
import { NotFound } from "pages/NotFound/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "styles/global";
import { privateRoutes, publicRoutes } from "utils/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry(failureCount, error) {
        if (error.status === 404) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
    },
  },
});

function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={FullPageErrorFallback} onReset={reset}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={privateRoutes.DISCOVER} />}
                />
                <Route path={publicRoutes.LOGIN} element={<Login />} />
                <Route path={publicRoutes.REGISTER} element={<Register />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path={privateRoutes.DISCOVER} element={<Discover />} />
                  <Route
                    path={`${privateRoutes.DISCOVER}/:movieId`}
                    element={<Movie />}
                  />
                  <Route path={privateRoutes.LIST} element={<List />} />
                  <Route path={privateRoutes.FINISHED} element={<Finished />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ErrorBoundary>
    </SkeletonTheme>
  );
}

export { App };
