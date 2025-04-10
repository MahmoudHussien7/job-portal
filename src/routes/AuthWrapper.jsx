import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Ui/Loader";

const publicRoutes = ["/", "/login", "/register"];

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, userData, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const path = location.pathname;

  // ⏳ Optional: Show loader while checking auth
  if (isLoading) return <Loader />;

  // 🚪 If not authenticated, allow public pages
  if (!isAuthenticated) {
    if (publicRoutes.includes(path)) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }

  // If authenticated and admin
  if (userData?.role === "admin") {
    if (path.startsWith("/dashboard")) {
      return children;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // 👤 Regular users shouldn't access /dashboard
  if (path.startsWith("/dashboard")) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Prevent logged-in users from accessing login/register
  if (["/login", "/register"].includes(path)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthWrapper;
