import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../../app/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, userData } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user && !userData) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user, userData]);

  const logOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Assuming logoutUser is an async thunk
      toast.success("Logged out successfully!", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred while logging out. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="mb-10 mx-16">
      <nav className="flex w-full justify-between p-4">
        <Link to="/" className="text-lg font-bold">
          Job Portal
        </Link>
        <ul className="flex space-x-4">
          <li>
            {isAuthenticated ? (
              <span className="hover:text-violet-500">
                Hi, {userData?.userName}
              </span>
            ) : null}
          </li>
          <li>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-MainColor hover:text-HoverColor"
              >
                Login
              </Link>
            ) : (
              <a href="#" onClick={logOut} className="hover:text-violet-500">
                Logout
              </a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
