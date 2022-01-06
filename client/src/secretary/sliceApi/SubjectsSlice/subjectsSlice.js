 
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSubjectsApiAsync = createAsyncThunk(
  "subjecst/getSubjectsApi",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/import/getMonThi");
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);
export const subjectsSlice = createSlice({
  name: "subjects",
  initialState: { SubjectsApi: { data: [], loading: false, error: "" } },
  reducers: {},
  extraReducers: {
    [getSubjectsApiAsync.pending]: (state) => {
      state.SubjectsApi.loading = true;
    },
    [getSubjectsApiAsync.rejected]: (state, action) => {
      state.SubjectsApi.loading = false;
      state.SubjectsApi.error = action.payload.message;
    },
    [getSubjectsApiAsync.fulfilled]: (state, action) => {
      state.SubjectsApi.loading = false;
      state.SubjectsApi.data = [...action.payload];
    },
  },
});
export default subjectsSlice;
