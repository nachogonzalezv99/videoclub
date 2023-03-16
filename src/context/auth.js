import { useQueryClient } from "@tanstack/react-query";
import { FullPageSpinner } from "components/FullPageSpinner/FullPageSpinner";
import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "utils/auth-provider";
import { client } from "utils/client";

async function getUser() {
  let user = null;
  const token = await auth.getToken();
  if (token) {
    const data = await client("me", { token });
    user = data.user;
  }
  return user;
}

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((user) => setUser(user))
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const login = (data) => auth.login(data).then((user) => setUser(user));
  const register = (data) => auth.register(data).then((user) => setUser(user));
  const logout = () => {
    auth.logout();
    queryClient.clear();
    setUser(null);
  };

  const value = { user, login, register, logout };

  if (isLoading) return <FullPageSpinner />;

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
