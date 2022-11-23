import { configureStore } from '@reduxjs/toolkit';
import {
    countReducer,
    userReducer,
} from './reducer';

export const store = configureStore({
    reducer: {
        countReducer,
        userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

