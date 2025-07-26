// src/components/AuthRoute.tsx
import { Navigate } from "react-router-dom";
import { auth } from "@/lib/firebase";

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};