import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";
import Error from "./Ui/Error";
import Home from "./Pages/Home";
import JobDetailes from "./Pages/JobDetailes";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
