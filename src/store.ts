import { configureStore } from '@reduxjs/toolkit';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'
import {
    countReducer,
    userReducer,
    userSlice,
} from './reducer';

export const store = configureStore({
    reducer: {
        countReducer,
        userReducer,
        user: userSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

