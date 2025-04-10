import { Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import AuthListener from "./Features/auth/AuthListener";
import Loader from "./Ui/Loader";
import routes from "./routes/route";

function App() {
  const router = createBrowserRouter(routes);

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
