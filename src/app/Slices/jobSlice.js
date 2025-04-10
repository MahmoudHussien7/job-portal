import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/Firebase/Config";

const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, thunkAPI) => {
  try {
    const getjobs = await getDocs(collection(db, "jobs"));
    const jobs = getjobs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return jobs;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const addjob = createAsyncThunk("jobs/addjob", async (jobData, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, "jobs"), jobData);
    const newJob = { id: docRef.id, ...jobData };
    return newJob;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const deletejob = createAsyncThunk(
  "jobs/deleteJob",
  async (JobId, thunkAPI) => {
    try {
      await deleteDoc(doc(collection(db, "jobs"), JobId));
      return JobId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const updatejob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, updatedData }, thunkAPI) => {
    try {
      const jobRef = doc(collection(db, "jobs"), jobId);
      await updateDoc(jobRef, updatedData);
      return { jobId, updatedData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  jobs: [],
  loading: {
    fetch: false,
    add: false,
    update: false,
    delete: false,
  },
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading.fetch = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload;
      })

      .addCase(addjob.pending, (state) => {
        state.loading.add = true;
        state.error = null;
      })
      .addCase(addjob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
        state.loading.add = false;
      })
      .addCase(addjob.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload;
      })

      .addCase(updatejob.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updatejob.fulfilled, (state, action) => {
        const { jobId, updatedData } = action.payload;
        const index = state.jobs.findIndex((job) => job.id === jobId);
        if (index !== -1) {
          state.jobs[index] = { ...state.jobs[index], ...updatedData };
        }
        state.loading.update = false;
      })
      .addCase(updatejob.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      .addCase(deletejob.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deletejob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
        state.loading.delete = false;
      })
      .addCase(deletejob.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
export { fetchJobs, addjob, deletejob, updatejob };
