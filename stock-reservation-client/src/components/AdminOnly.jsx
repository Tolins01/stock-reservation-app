import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminOnly({ children }) {
  const { user } = useAuth();
  if (!["admin", "manager"].includes(user?.role)) return <Navigate to="/" replace />;
  return children;
}
