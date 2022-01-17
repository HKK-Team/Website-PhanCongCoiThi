import { configureStore } from "@reduxjs/toolkit";
import schedulesSlice from "./ApiSlice/schudeleSlice";

export const store = configureStore({
  reducer: {
    Schedules: schedulesSlice.reducer,
  },
});
