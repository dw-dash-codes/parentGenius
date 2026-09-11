import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;


  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}