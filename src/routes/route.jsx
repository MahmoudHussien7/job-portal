import { lazy } from "react";
import Home from "../pages/Home";
import AuthWrapper from "./AuthWrapper";
import ProtectedRoute from "./ProtectedRoute";
import RecruiterDashboard from "../Recruiter/RecruiterDashboard";
import Myjobs from "../Recruiter/Myjobs";
import RecruiterAddJob from "../Recruiter/RecruiterAddJob";
import EditJob from "../Recruiter/EditJob";
import Profile from "../Components/UserProfile";

const JobDetailes = lazy(() => import("../Components/JobDetailes"));
const LoginForm = lazy(() => import("../Features/auth/LoginForm"));
const Register = lazy(() => import("../Features/auth/Register"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const AddJob = lazy(() => import("../AdminDashboard/components/AddJob"));
const Jobs = lazy(() => import("../AdminDashboard/components/Jobs"));
const Error = lazy(() => import("../Components/Error"));
const AppLayout = lazy(() => import("../Components/AppLayout"));
const routes = [
  {
    element: (
      <AuthWrapper>
        <AppLayout />
      </AuthWrapper>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetailes />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute requiredRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "addjob",
            element: <AddJob />,
          },
          {
            path: "viewjobs",
            element: <Jobs />,
          },
        ],
      },
      {
        path: "/recruiter",
        element: (
          <ProtectedRoute requiredRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "addjob",
            element: <RecruiterAddJob />,
          },
          {
            path: "myjobs",
            element: <Myjobs />,
          },
          {
            path: "/recruiter/editjob/:id",
            element: (
              <ProtectedRoute requiredRoles={["recruiter"]}>
                <EditJob />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
];
export default routes;
