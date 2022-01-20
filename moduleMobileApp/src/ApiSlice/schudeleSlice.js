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
      const res = await axios.get("http://10.0.2.2:5000/import/getLichthi");
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
  },
  reducers: {},
  extraReducers: {
    [getSchedulesApiAsync.pending]: (state) => {
      state.SchedulesApi.loading = true;
    },
    [getSchedulesApiAsync.rejected]: (state, action) => {
      state.SchedulesApi.loading = false;
      state.SchedulesApi.error = 'Error';
    },
    [getSchedulesApiAsync.fulfilled]: (state, action) => {
      state.SchedulesApi.loading = false;
      state.SchedulesApi.data = [...action.payload];
    },
  },
});
export default schedulesSlice;
