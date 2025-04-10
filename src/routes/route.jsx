import { lazy } from "react";
import Home from "../pages/Home";
import AuthWrapper from "./AuthWrapper";
import ProtectedRoute from "./ProtectedRoute";

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
          <ProtectedRoute allowedRoles={["admin"]}>
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
    ],
  },
];
export default routes;
