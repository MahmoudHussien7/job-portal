import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../Features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Use Link from react-router-dom

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userDetails } = useSelector((state) => state.auth);
  const isLoggedin = !!user; // Check if user is logged in

  useEffect(() => {
    if (user && !userDetails) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user, userDetails]);

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
            {isLoggedin && (
              <span className="hover:text-violet-500">
                Hi, {userDetails?.userName}
              </span>
            )}
          </li>
          <li>
            {!isLoggedin ? (
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
