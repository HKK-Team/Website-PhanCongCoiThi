import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTieuLuanApiAsync = createAsyncThunk(
  "tieuLuan/getTieuLuanApiAsync",
  async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/lecturersTieuLuan/getTieuLuan"
      );
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const tieuLuaSlide = createSlice({
  name: "tieuLuan",
  initialState: {
    tieuLuanApi: { data: [], loading: false, error: "" },
    LecturesDoesNotMach: { data: [], id: "" },
  },
  reducers: {
    getLecturesDoesNotMach: (state, action) => {
      state.LecturesDoesNotMach.data = action.payload;
    },
    getIdTieuLuan: (state, action) => {
      state.LecturesDoesNotMach.id = action.payload;
    },
  },
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getTieuLuanApiAsync.pending]: (state) => {
      state.tieuLuanApi.loading = true;
    },
    [getTieuLuanApiAsync.rejected]: (state, action) => {
      state.tieuLuanApi.loading = true;
      state.tieuLuanApi.error = [...action.payload];
    },
    [getTieuLuanApiAsync.fulfilled]: (state, action) => {
      state.tieuLuanApi.loading = false;
      state.tieuLuanApi.data = [...action.payload];
    },
  },
});
export default tieuLuaSlide;
