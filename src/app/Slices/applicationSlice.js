// src/app/slices/applicationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/Firebase/Config";
import { toast } from "react-toastify";

export const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  async ({ jobId, recruiterId, applicantData }, { rejectWithValue }) => {
    try {
      const applicationData = {
        jobId,
        recruiterId,
        applicant: {
          fullName: applicantData.fullName,
          email: applicantData.email,
          coverLetter: applicantData.coverLetter,
          cvUrl: applicantData.cv,
          appliedRole: applicantData.appliedRole,
        },
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, "applications"),
        applicationData
      );
      return { id: docRef.id, ...applicationData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (recruiterId, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "applications"),
        where("recruiterId", "==", recruiterId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const applicationRef = doc(db, "applications", applicationId);
      await updateDoc(applicationRef, { status });
      return { applicationId, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
        toast.success("Application submitted successfully!", {
          position: "bottom-right",
        });
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to submit application", {
          position: "bottom-right",
        });
      })
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to fetch applications", {
          position: "bottom-right",
        });
      })
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { applicationId, status } = action.payload;
        const application = state.applications.find(
          (app) => app.id === applicationId
        );
        if (application) {
          application.status = status;
        }
        toast.success("Application status updated!", {
          position: "bottom-right",
        });
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to update application status", {
          position: "bottom-right",
        });
      });
  },
});

export default applicationSlice.reducer;
