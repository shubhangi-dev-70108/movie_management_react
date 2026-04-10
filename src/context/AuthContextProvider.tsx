import { useEffect, useState, useReducer } from "react";
import type { contextProps, AuthState } from "../types";
import { initialState } from "../utils/constants";
import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducer/AuthReducer";

const AuthContextProvider = ({ children }: contextProps) => {
  //if local auth not found then reset to initial
  const getInitialState = (): AuthState => {
    const data = localStorage.getItem("role");

    if (data == "admin" || data == "user") {
      return {
        ...initialState,
        userRole: data,
      };
    } else {
      return initialState;
    }
  };

  //to show reducer in UI
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  // using context
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem("login") == "true",
  );

  /* update login state in local */
  useEffect(() => {
    localStorage.setItem("login", String(isLoggedIn));
  }, [isLoggedIn]);

  const loginFn = () => {
    setIsLoggedIn(true);
    localStorage.setItem("login", "true");
  };

  const logoutFn = () => {
    setIsLoggedIn(false);
    localStorage.setItem("login", "false");
  };

  return (
    <AuthContext value={{ isLoggedIn, logoutFn, loginFn, state, dispatch }}>
      {children}
    </AuthContext>
  );
};

export default AuthContextProvider;
