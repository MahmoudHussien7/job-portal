import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AuthListener from "./Features/auth/AuthListener.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <AuthListener />
      <App />
    </StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </Provider>
);
