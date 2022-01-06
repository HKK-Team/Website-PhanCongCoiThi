import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getNamHocApiAsync = createAsyncThunk(
  "namHoc/getNamHocsApi",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/import/getNamHoc");
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const namHocSlide = createSlice({
  name: "namHoc",
  initialState: { NamHocApi: { data: [], loading: false, error: "" } },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getNamHocApiAsync.pending]: (state) => {
      state.NamHocApi.loading = true;
    },
    [getNamHocApiAsync.rejected]: (state, action) => {
      state.NamHocApi.loading = false;
      state.NamHocApi.error = action.error.massage;
    },
    [getNamHocApiAsync.fulfilled]: (state, action) => {
      state.NamHocApi.loading = false;
      state.NamHocApi.data = action.payload;
    },
  },
});
export default namHocSlide;
