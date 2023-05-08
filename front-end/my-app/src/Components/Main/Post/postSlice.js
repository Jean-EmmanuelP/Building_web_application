import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {},
    },
    reducers: {}
});

export const selectPosts = (state) => state.posts.posts;
export default postSlice.reducer;