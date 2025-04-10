import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import jobsReducer from "./Slices/jobSlice";

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
