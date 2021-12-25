import { configureStore } from "@reduxjs/toolkit";
import lecturersSlice from "../secretary/sliceApi/LecturersSlice/lecturersSlice";
import schedulesSlice from "../secretary/sliceApi/SchedulesSlice/schedulesSlice";
import subjectsSlice from "../secretary/sliceApi/SubjectsSlice/subjectsSlice";

const store = configureStore({
  reducer: {
    Lecturers: lecturersSlice.reducer,
    Subjects: subjectsSlice.reducer,
    Schedules: schedulesSlice.reducer,
  },
});
export default store;
