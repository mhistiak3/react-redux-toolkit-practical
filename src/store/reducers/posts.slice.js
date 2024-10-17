import { createAsyncThunk, createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * The `createEntityAdapter` function returns an object with methods for
 * manipulating normalized data structures. The `sortComparer` option is
 * used to sort the entities in the state. In this case, we want the
 * posts to be sorted by date in descending order, so we use the
 * `localeCompare` method to compare the dates.
 */
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})
const initialState = postsAdapter.getInitialState({
  posts: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
})

// fetch post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    
    reactionsAdded(state, action) {
      const { postId, key: reaction } = action.payload;


      const existingPost = state.entities[postId];
      
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // adding date and reactions
        const loadedPosts = action.payload.map((post, index) => {
          post.date = sub(new Date(), { minutes: index * 10 }).toISOString();
          post.reactions = {
            thumbUp: 0,
            heart: 0,
            haha: 0,
          };
          return post;
        });

        // state.posts = state.posts.concat(loadedPosts);
        
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
     

        action.payload.id = Number(action.payload.id);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbUp: 0,
          heart: 0,
          haha: 0,
        };
        // state.posts.unshift(action.payload);
        postsAdapter.addOne(state, action.payload);

      });
  },
});
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const {  reactionsAdded } = postsSlice.actions;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// createSelector for memorized selector
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id == postId);
const postsReducer = postsSlice.reducer;
export default postsReducer;
