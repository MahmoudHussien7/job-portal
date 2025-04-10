import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../app/Slices/authSlice"; // Adjust the path as needed

const RecruiterDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  // Determine active page for navigation highlighting
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

      {/* Drawer sidebar content */}
      <div className="drawer-side bg-base-200">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <div className="menu p-4 w-64 h-full text-base-content">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-3 mb-6">
            <span className="text-2xl font-bold text-primary">InsiderJobs</span>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/recruiter/myjobs"
                className={`flex items-center p-2 rounded-lg ${
                  isActive("myjobs") ? "bg-primary text-primary-content" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">My Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/recruiter/addjob"
                className={`flex items-center p-2 rounded-lg ${
                  isActive("addjob") ? "bg-primary text-primary-content" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Add Job</span>
              </Link>
            </li>
            <li>
              <Link
                to="/recruiter/applications"
                className={`flex items-center p-2 rounded-lg ${
                  isActive("applications")
                    ? "bg-primary text-primary-content"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">Applications</span>
              </Link>
            </li>
          </ul>

          {/* User Info and Logout */}
          <div className="mt-auto pt-4 border-t border-base-300">
            <div className="flex items-center p-2">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span>
                    {userData?.userName?.charAt(0)?.toUpperCase() || "R"}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {userData?.userName || "Recruiter"}
                </p>
                <p className="text-xs text-base-content/70">
                  {userData?.userEmail || ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 mt-2 rounded-lg hover:bg-error hover:text-error-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-4-4H3zM2 4a2 2 0 012-2h9.586a1 1 0 01.707.293l4.414 4.414A1 1 0 0119 7.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 lg:hidden">
          <div className="flex-none">
            <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">InsiderJobs</span>
          </div>
        </div>

        <div className="px-6 py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-base-content">
              {isActive("myjobs")
                ? "My Jobs"
                : isActive("addjob")
                ? "Add New Job"
                : isActive("editjob")
                ? "Edit Job"
                : "Recruiter Dashboard"}
            </h1>
            <p className="text-base-content/70">
              {isActive("myjobs")
                ? "Manage your posted jobs"
                : isActive("addjob")
                ? "Create a new job listing"
                : isActive("editjob")
                ? "Update job details"
                : "Welcome to your recruiter dashboard"}
            </p>
          </header>

          {/* This is where your child routes will render */}
          <div className="bg-base-100 rounded-box p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
