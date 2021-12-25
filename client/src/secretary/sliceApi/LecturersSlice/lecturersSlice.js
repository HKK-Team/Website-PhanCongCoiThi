import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import axios from "axios";

export const getLecturersApiAsync = createAsyncThunk(
  "lecturers/getLecturersApi",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/import/getGiangVien");
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const lecturersSlice = createSlice({
  name: "lecturers",
  initialState: { LecturersApi: { data: [], loading: false, error: "" } },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getLecturersApiAsync.pending]: (state) => {
      state.LecturersApi.loading = true;
    },
    [getLecturersApiAsync.rejected]: (state, action) => {
      state.LecturersApi.loading = false;
      state.LecturersApi.error = [...action.payload];
    },
    [getLecturersApiAsync.fulfilled]: (state, action) => {
      state.LecturersApi.loading = false;
      state.LecturersApi.data = [...action.payload];
    },
  },
});
export default lecturersSlice;
