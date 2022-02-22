import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSecretaryAccApiAsync = createAsyncThunk(
  "secretaryAccount/getSecretaryAccApi",
  async () => {
    try {
      const users = window.sessionStorage.getItem("SecretaryUserName");
      const email = window.sessionStorage.getItem("SecretaryUserEmail");
      let res = "";
      if (users) {
        res = await axios.get(`/secretary/getuser?username[regex]=${users}`);
      } else {
        res = await axios.get(`/secretary/getuser?email[regex]=${email}`);
      }
      return res.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);
export const secretaryAccSlice = createSlice({
  name: "secretaryAccount",
  initialState: {
    secretaryAccountApi: { data: [], login: false, error: "" },
  },
  reducers: {},
  extraReducers: {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    [getSecretaryAccApiAsync.pending]: (state) => {
      state.secretaryAccountApi.login = false;
    },
    [getSecretaryAccApiAsync.rejected]: (state, action) => {
      state.secretaryAccountApi.login = true;
      state.secretaryAccountApi.error = [...action.payload];
    },
    [getSecretaryAccApiAsync.fulfilled]: (state, action) => {
      state.secretaryAccountApi.login = true;
      state.secretaryAccountApi.data = [...action.payload];
    },
  },
});
export default secretaryAccSlice;
