import { configureStore } from "@reduxjs/toolkit";
import secretaryAccSlice from "../api/secretarysAccountSlice";
import lecturersSlice from "../secretary/sliceApi/LecturersSlice/lecturersSlice";
import schedulesSlice from "../secretary/sliceApi/SchedulesSlice/schedulesSlice";
import subjectsSlice from "../secretary/sliceApi/SubjectsSlice/subjectsSlice";

const store = configureStore({
  reducer: {
    Lecturers: lecturersSlice.reducer,
    Subjects: subjectsSlice.reducer,
    Schedules: schedulesSlice.reducer,
    SecretaryAccount: secretaryAccSlice.reducer,
  },
});
export default store;
