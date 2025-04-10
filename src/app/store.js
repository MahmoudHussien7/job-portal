import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import jobsReducer from "./Slices/jobSlice";
import applicationsReducer from "./Slices/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    applications: applicationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to prevent non-serializable errors
    }),
});
