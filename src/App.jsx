import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";
import Error from "./Ui/Error";
import Home from "./Pages/Home";
import JobDetailes from "./Pages/JobDetailes";
import LoginForm from "./Features/auth/LoginForm";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import Register from "./Features/auth/Register";
import { ToastContainer } from "react-toastify";
import AuthListener from "./Features/auth/AuthListener";


function App() {
  // const router = createBrowserRouter([
  //   {
  //     element: <AppLayout />,
  //     errorElement: <Error />,

  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/jobs",
  //         element: <JobDetailes />,
  //       },
  //       {
  //         path: "/login",
  //         element: <LoginForm />,
  //       },
  //       {
  //         path: "/signup",
  //         element: <Register />,
  //       },
  //     ],
  //   },
  // ]);
  return (
    <>
      {/* <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
        <AuthListener />
      </Provider> */}
      <JobDetailes />
    </>
  );
}
export default App;
