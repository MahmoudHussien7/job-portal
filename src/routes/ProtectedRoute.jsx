// export default ProtectedRoute;
/**
 * RouteGuard - A comprehensive component that handles all route protection logic
 *
 * @param {Object} props
 * @param {Array} props.requiredRoles - Roles that can access this route (empty array = any authenticated user)
 * @param {boolean} props.guestOnly - If true, authenticated users will be redirected away
 * @param {string} props.redirectTo - Where to redirect unauthorized users
 * @param {boolean} props.showNavbar - Whether to show the navbar
 */
const ProtectedRoute = ({
  requiredRoles = [],
  guestOnly = false,
  redirectTo = "/login",
  showNavbar = true,
}) => {
  const { isAuthenticated, userData, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  // Handle guest-only routes (login, register)
  if (guestOnly && isAuthenticated) {
    // Redirect to home or dashboard based on role
    const redirectPath = userData?.role === "admin" ? "/dashboard" : "/";
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  // Handle protected routes for unauthenticated users
  if (!guestOnly && !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Handle role-based access for authenticated users
  if (
    isAuthenticated &&
    requiredRoles.length > 0 &&
    !requiredRoles.includes(userData?.role)
  ) {
    const fallbackPath = userData?.role === "admin" ? "/dashboard" : "/";
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  // If all checks pass, render the route with appropriate layout
  return (
    <>
      {showNavbar && <Navbar />}
      <main className="mx-16 mt-10 mb-10">
        <Outlet />
      </main>
    </>
  );
};
export default ProtectedRoute;
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Ui/Loader"; // Assuming you have a Loader component
import Navbar from "../Components/common/Navbar"; // Assuming you have a Navbar component
