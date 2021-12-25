// import { useState, useEffect } from "react";
// import axios from "axios";

// function SecretaryAPI() {
//   const [users, setUser] = useState([]);
//   const [isLogin, setIsLogin] = useState(false);
//   const [secretary, setSecretary] = useState();
//   useEffect(() => {
//     const getSecretary = async () => {
//       try {
//         setUser(window.sessionStorage.getItem("SecretaryEmail"));
//         const res = await axios.get(`/secretary/getuser?email[regex]=${users}`);
//         setSecretary(res.data);
//         setIsLogin(true);
//       } catch (err) {
//         return err.response.data.msg;
//       }
//     };
//     getSecretary();
//   }, [users]);
//   return {
//     secretary: [secretary, setSecretary],
//     isLogin: [isLogin, setIsLogin],
//     users: [users, setUser],
//   };
// }

// export default SecretaryAPI;

import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSecretaryAccApiAsync = createAsyncThunk(
  "secretaryAccount/getSecretaryAccApi",
  async () => {
    try {
      const users = window.sessionStorage.getItem("SecretaryEmail");
      const res = await axios.get(`/secretary/getuser?email[regex]=${users}`);
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
