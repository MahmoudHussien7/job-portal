// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Loader from "../../Ui/Loader"; // Assuming you have a Loader component

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, userData } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userData?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
