import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "../features/job/jobSlice";

export default configureStore({
  reducer: {
    job: jobSlice,
  },
});
