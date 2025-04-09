import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Ui/Loader"; // Assuming you have a Loader component

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, userData, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const currentPath = location.pathname;

  // Show loading state while authentication is being verified
  if (isLoading) {
    return <Loader />;
  }

  // Unauthenticated users: allow access to login, register, and homepage
  if (!isAuthenticated) {
    if (
      currentPath === "/" ||
      currentPath === "/register" ||
      currentPath === "/login" ||
      currentPath.startsWith("/jobs/")
    ) {
      return children;
    }
    return <Navigate to="/" />;
  }

  // Authenticated users:
  if (userData?.role === "admin") {
    // If the user is an admin, allow access to the dashboard
    if (currentPath.startsWith("/dashboard")) {
      return children;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Regular authenticated users:
  if (currentPath === "/login" || currentPath === "/register") {
    // Redirect authenticated users away from login/register pages
    return <Navigate to="/" replace />;
  }

  // Regular authenticated users should not access the dashboard
  if (currentPath.startsWith("/dashboard")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthWrapper;
