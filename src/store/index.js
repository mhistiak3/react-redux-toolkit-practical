import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts.slice";
import usersReducer from "./reducers/users.slice";


const store = configureStore({
  reducer: {
   posts:postsReducer,
   users:usersReducer
  },
});

export default store;
