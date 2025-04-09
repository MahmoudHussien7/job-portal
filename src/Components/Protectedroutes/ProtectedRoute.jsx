import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../Ui/Loader"; // Assuming you have a Loader component

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
