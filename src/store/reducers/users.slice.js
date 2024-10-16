import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Istiak",
  },
  {
    id: 2,
    name: "Hasan",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllusers = (state) => state.users;
const usersReducer = usersSlice.reducer;
export default usersReducer;
