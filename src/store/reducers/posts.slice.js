import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
    

const initialState = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbUp: 0,
      heart: 0,
      haha: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: sub(new Date(), { minutes: 10 }).toISOString(),
            reactions: {
              thumbUp: 0,
              heart: 0,
              haha: 0,
            },
          },
        };
      },
    },
    reactionsAdded: (state, action) => {
      const { postId, key:reaction } = action.payload;
      const existingPost = state.find((post) => post.id == postId);
      console.log(postId);
      if (existingPost) {
        
        
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const { postAdded, reactionsAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts;
const postsReducer = postsSlice.reducer;
export default postsReducer;
