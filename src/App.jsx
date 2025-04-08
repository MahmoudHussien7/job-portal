import { lazy, Suspense } from "react"; // أضف هذه الاستيرادات
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";
import Error from "./Ui/Error";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import AuthListener from "./Features/auth/AuthListener";

// استخدم React.lazy لاستيراد المكونات بشكل متقطع
const Home = lazy(() => import("./Pages/Home"));
const JobDetailes = lazy(() => import("./Pages/JobDetailes"));
const LoginForm = lazy(() => import("./Features/auth/LoginForm"));
const Register = lazy(() => import("./Features/auth/Register"));

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/jobs",
          element: <JobDetailes />,
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>
          ),
        },
        {
          path: "/signup",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
        <AuthListener />
      </Provider>
    </>
  );
}

export default App;
