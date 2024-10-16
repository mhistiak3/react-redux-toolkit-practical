import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users";
const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = axios.get(USER_URL);
    return (await response).data;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllusers = (state) => state.users;
const usersReducer = usersSlice.reducer;
export default usersReducer;
