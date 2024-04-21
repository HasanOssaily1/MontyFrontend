
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import userDetailsReducer from './reducers/userDetailsReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userview: userReducer,
        userdetails: userDetailsReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
