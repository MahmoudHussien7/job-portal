import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to prevent non-serializable errors
    }),
});
