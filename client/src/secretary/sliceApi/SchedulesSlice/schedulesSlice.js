import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSchedulesApiAsync = createAsyncThunk(
  "schedules/getSchedulesApi",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/import/getLichthi");
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const schedulesSlice = createSlice({
  name: "schedules",
  initialState: {
    SchedulesApi: { data: [], loading: false, error: "" },
    filters: { tenHocKi: "", maVienChucVSTenLop: "" },
  },
  reducers: {
    FilterTenHocKi: (state, action) => {
      state.filters.tenHocKi = action.payload;
    },
    FilterKeyWord: (state, action) => {
      state.filters.maVienChucVSTenLop = action.payload;
    },
  },
  extraReducers: {
    [getSchedulesApiAsync.pending]: (state) => {
      state.SchedulesApi.loading = true;
    },
    [getSchedulesApiAsync.rejected]: (state, action) => {
      state.SchedulesApi.loading = false;
      state.SchedulesApi.error = [...action.payload];
    },
    [getSchedulesApiAsync.fulfilled]: (state, action) => {
      state.SchedulesApi.loading = false;
      state.SchedulesApi.data = [...action.payload];
    },
  },
});
export default schedulesSlice;
