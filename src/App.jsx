import { lazy, Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";
import Error from "./Ui/Error";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import ProtectedRoute from "./utils/Protectedroutes/ProtectedRoute";
import AuthListener from "./Features/auth/AuthListener";
import AuthWrapper from "./utils/Protectedroutes/AuthWrapper";
import Loader from "./Ui/Loader";
import AddJob from "./AdminDashboard/components/addJob";
import Jobs from "./AdminDashboard/components/Jobs";

const JobDetailes = lazy(() => import("./Pages/JobDetailes"));
const LoginForm = lazy(() => import("./Features/auth/LoginForm"));
const Register = lazy(() => import("./Features/auth/Register"));
const Dashboard = lazy(() => import("./AdminDashboard/Dashboard"));

function App() {
  const router = createBrowserRouter([
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
          element: <Dashboard />,
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
  ]);

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        <ToastContainer />
        <AuthListener />
      </Suspense>
    </Provider>
  );
}

export default App;
