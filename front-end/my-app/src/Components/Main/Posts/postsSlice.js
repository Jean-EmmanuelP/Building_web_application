import { createSlice } from '@reduxjs/toolkit';

const comments = ['First comment', 'Second Comment'];
const likes = [5];

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {
            author: "James",
            image: "/image.jpg",
            comments: comments,
            likes: likes,
        },
    },
    reducers: {}
});

export const selectPosts = (state) => state.posts.posts;
export default postSlice.reducer;