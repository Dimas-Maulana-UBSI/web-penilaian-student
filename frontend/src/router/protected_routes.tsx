import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../types/user";

interface ProtectedRouteProps {
  roles?: string[];
}

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const storedUser = sessionStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (roles && (!user.Role || !roles.includes(user.Role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
