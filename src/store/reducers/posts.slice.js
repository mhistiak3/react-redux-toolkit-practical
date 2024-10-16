import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// fetch post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data]
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  const response = await axios.post(POST_URL, initialPost);
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.unshift(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            userId,
            date: sub(new Date(), { minutes: 1 }).toISOString(),
            reactions: {
              thumbUp: 0,
              heart: 0,
              haha: 0,
            },
          },
        };
      },
    },
    reactionsAdded(state, action) {
      const { postId, key: reaction } = action.payload;
      
      const existingPost = state.posts.find((post) => post.id == postId);
      console.log(postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(fetchPosts.fulfilled,(state,action)=>{
      state.status = "succeeded";
      // adding date and reactions
      const loadedPosts = action.payload.map((post,index) => {
        post.date = sub(new Date(), { minutes: index*10 }).toISOString();
        post.reactions = {
          thumbUp: 0,
          heart: 0,
          haha: 0,
        }
        return post
      })
      state.posts = state.posts.concat(loadedPosts)
      
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      console.log(action);
      
      action.payload.id =Number(action.payload.id)
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbUp: 0,
        heart: 0,
        haha: 0,
      };
      state.posts.unshift(action.payload);
    })
  },
});

export const { postAdded, reactionsAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
const postsReducer = postsSlice.reducer;
export default postsReducer;
