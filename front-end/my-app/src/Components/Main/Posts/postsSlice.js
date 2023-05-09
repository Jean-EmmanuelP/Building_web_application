import { createSlice } from "@reduxjs/toolkit";

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
const avatar = "data/profile_images/profile-1.png";

export const postSlice = createSlice({
  name: "postsSlice",
  initialState: {
    posts: {
      1: {
        id: 1,
        user: "Jean-Emmanuel",
        avatar: avatar,
        src: "https://source.unsplash.com/pp_oXEb2H48",
        caption: "Sample caption",
        comments: comments,
        likes: likes,
      },
      2: {
        id: 2,
        user: "James",
        avatar: avatar,
        src: "https://source.unsplash.com/i9Q9bc-WgfE",
        caption: "Sample caption",
        comments: comments,
        likes: likes,
      },
      3: {
        id: 3,
        user: "Max",
        avatar: avatar,
        src: "https://source.unsplash.com/Hyt-Ixm3pwA",
        caption: "Sample caption",
        comments: comments,
        likes: likes,
      },
    },
  },
  reducers: {},
});

export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;
