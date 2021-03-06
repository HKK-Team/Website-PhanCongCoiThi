import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
export const getUserApiAsync = createAsyncThunk(
  "users/getUserApiAsync",
  async () => {
    try {
      const userEmail = await AsyncStorage.getItem("UserEmail");
      if (userEmail !== null) {
        const dataUser = await axios.get(
          `http://10.0.2.2:5000/lecturer/getuser?email[regex]=${userEmail}`
        );
        return dataUser.data;
      }
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    UserApi: { data: [], loading: false, error: "" },
  },
  reducers: {},
  extraReducers: {
    [getUserApiAsync.pending]: (state) => {
      state.UserApi.loading = true;
    },
    [getUserApiAsync.rejected]: (state, action) => {
      state.UserApi.loading = false;
      state.UserApi.error = "Error";
    },
    [getUserApiAsync.fulfilled]: (state, action) => {
      state.UserApi.loading = false;
      state.UserApi.data = action.payload;
    },
  },
});

export default userSlice;
