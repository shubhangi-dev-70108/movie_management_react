import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  // hydrate from localStorage
  const [isLoggedIn] = useState<boolean>(
    () => localStorage.getItem("login") == "true",
  );

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
