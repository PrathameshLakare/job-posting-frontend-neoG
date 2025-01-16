import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const fetchAllJobs = createAsyncThunk("fetch/jobs", async () => {
  const response = await axios.get(`${url}/api/job`);
  return response.data;
});

export const postJobDetails = createAsyncThunk("post/job", async (jobData) => {
  const response = await axios.post(`${url}/api/job`, jobData);

  return response.data;
});

export const fetchJobDetails = createAsyncThunk(
  "fetch/jobDetails",
  async (jobId) => {
    const response = await axios.get(`${url}/api/job/${jobId}`);
    return response.data;
  }
);

export const deleteJobDetails = createAsyncThunk(
  "delete/job",
  async (jobId) => {
    const response = await axios.delete(`${url}/api/job/${jobId}`);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
    jobDetails: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllJobs.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllJobs.fulfilled, (state, action) => {
      state.status = "success";
      state.jobs = action.payload;
    });
    builder.addCase(fetchAllJobs.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postJobDetails.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postJobDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.jobs.push(action.payload.job);
    });
    builder.addCase(postJobDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchJobDetails.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchJobDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.jobDetails = action.payload.job;
    });
    builder.addCase(fetchJobDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteJobDetails.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteJobDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.jobs = state.jobs.filter(
        (job) => job._id !== action.payload.job._id
      );
    });
    builder.addCase(deleteJobDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default jobSlice.reducer;
