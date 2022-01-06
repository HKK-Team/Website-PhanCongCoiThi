import { configureStore } from "@reduxjs/toolkit";
import secretaryAccSlice from "..//api/secretarysAccountSlice";
import lecturersAccSlice from "../api/lecturersAccountSlice";
import lecturersSlice from "../secretary/sliceApi/LecturersSlice/lecturersSlice";
import namHocSlide from "../secretary/sliceApi/namHocSlice/namHocSlide";
import schedulesSlice from "../secretary/sliceApi/SchedulesSlice/schedulesSlice";
import subjectsSlice from "../secretary/sliceApi/SubjectsSlice/subjectsSlice";
import arrangeExamSchedule from "../secretary/sliceApi/ArrangeExamSchedule/arrangeExamScheduleSlide";
import tieuLuaSlide from "../api/tieuLuanSlide";

const store = configureStore({
  reducer: {
    Lecturers: lecturersSlice.reducer,
    Subjects: subjectsSlice.reducer,
    Schedules: schedulesSlice.reducer,
    SecretaryAccount: secretaryAccSlice.reducer,
    LecturersAccount: lecturersAccSlice.reducer,
    NamHoc: namHocSlide.reducer,
    ArrangeExamSchedule: arrangeExamSchedule.reducer,
    TieuLuan: tieuLuaSlide.reducer,
  },
});
export default store;
