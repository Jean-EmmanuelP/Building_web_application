import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../Main/Posts/postsSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
})