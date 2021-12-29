import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getLecturersAccApiAsync = createAsyncThunk(
  "lecturersAccount/getLecturersAccApi",
  async () => {
    try {
      const users = window.sessionStorage.getItem("LecturerEmail");
      const res = await axios.get(`/lecturer/getuser?email[regex]=${users}`);
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const lecturersAccSlice = createSlice({
  name: "lecturersAccount",
  initialState: { lecturersAccountApi: { data: [], login: false, error: "" } },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getLecturersAccApiAsync.pending]: (state) => {
      state.lecturersAccountApi.login = false;
    },
    [getLecturersAccApiAsync.rejected]: (state, action) => {
      state.lecturersAccountApi.login = true;
      state.lecturersAccountApi.error = [...action.payload];
    },
    [getLecturersAccApiAsync.fulfilled]: (state, action) => {
      state.lecturersAccountApi.login = true;
      state.lecturersAccountApi.data = [...action.payload];
    },
  },
});
export default lecturersAccSlice;
