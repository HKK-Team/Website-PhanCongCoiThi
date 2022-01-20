import { configureStore } from "@reduxjs/toolkit";
import schedulesSlice from "./ApiSlice/schudeleSlice";
import { userSlice } from "./ApiSlice/userAccSlide";

export const store = configureStore({
  reducer: {
    Schedules: schedulesSlice.reducer,
    Users : userSlice.reducer,
  },
});
