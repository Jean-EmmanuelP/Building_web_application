import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const comments = {
  1: {
    id: 1,
    user: "Commenter",
    comment: "First comment",
  },
  2: {
    id: 2,
    user: "Second commenter",
    comment: "Second Comment",
  },
};
const likes = [5];

/* fetching posts looks something like: 

export const fetchPosts = createAsyncThunk(
  "postsSlice/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:4001/api/posts');
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

*/

export const postSlice = createSlice({
  name: "postsSlice",
  initialState: {
    posts: {
      1: {
        id: 1,
        user: "Jean-Emmanuel",
        avatar: "data/profile_images/profile-1.png",
        src: "https://source.unsplash.com/pp_oXEb2H48",
        caption: "Sample caption",
        comments: comments,
        likes: likes,
      },
      2: {
        id: 2,
        user: "James",
        avatar: "data/profile_images/profile-8.png",
        src: "https://source.unsplash.com/i9Q9bc-WgfE",
        caption: "Sample caption",
        comments: comments,
        likes: likes,
      },
      3: {
        id: 3,
        user: "Max",
        avatar: "data/profile_images/profile-2.png",
        src: "https://source.unsplash.com/Hyt-Ixm3pwA",
        caption: "Sample caption",
        comments: comments,
        likes: likes,
      },
    },
  },
  reducers: {},
  /* extraReducers for fetching posts: 

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts = [];
        state.loading = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loading = "loaded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      })
  }

  */
});

export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;
