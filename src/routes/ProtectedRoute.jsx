import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Ui/Loader";

/**
 * RouteGuard - Handles authentication and role-based protection.
 *
 * @param {Array} requiredRoles - Allowed roles (e.g., ['admin', 'recruiter'])
 * @param {boolean} guestOnly - If true, redirects logged-in users away
 * @param {string} redirectTo - Fallback for unauthenticated users
 * @param {boolean} showNavbar - Layout toggle
 * @param {ReactNode} children - Rendered content
 */
const ProtectedRoute = ({
  requiredRoles = [],
  guestOnly = false,
  redirectTo = "/login",
  showNavbar = true,
  children,
}) => {
  const { isAuthenticated, userData, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (isLoading) return <Loader />;

  // 🚫 Redirect authenticated users from guest-only routes (e.g., login/register)
  if (guestOnly && isAuthenticated) {
    const redirectPath =
      userData?.role === "admin"
        ? "/dashboard"
        : userData?.role === "recruiter"
        ? "/recruiter/myjobs"
        : "/";
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  // 🔐 Block access for unauthenticated users
  if (!guestOnly && !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // ⛔ Block users without the required role
  if (
    isAuthenticated &&
    requiredRoles.length > 0 &&
    !requiredRoles.includes(userData?.role)
  ) {
    const fallbackPath =
      userData?.role === "admin"
        ? "/dashboard"
        : userData?.role === "recruiter"
        ? "/recruiter/myjobs"
        : "/";
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  return showNavbar ? (
    <main className="mx-16 mt-10 mb-10">{children}</main>
  ) : (
    children
  );
};

export default ProtectedRoute;
