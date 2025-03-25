import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

export const AuthRedirect = ({ children }: { children: React.JSX.Element }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/home" /> : children;
};