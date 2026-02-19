import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  const token = localStorage.getItem("auth_token");
  const userRaw = localStorage.getItem("auth_user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  return { token, user };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth());

  const login = (token, user) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setAuth({ token: null, user: null });
  };

  const value = useMemo(() => ({ ...auth, login, logout }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
