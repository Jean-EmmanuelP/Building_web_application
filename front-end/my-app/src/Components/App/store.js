import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../Main/Post/postSlice';

export const store = configureStore({
    reducer: {
        posts: postReducer,
    }
})