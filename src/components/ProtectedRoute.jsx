import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  console.log("🔐 ProtectedRoute user:", user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
