
import { createReducer } from '@reduxjs/toolkit';
import { LogIn, LogOut } from '../actions/authActions';

interface authState {
    value: boolean;
}

const initialState: authState = {
    value: false,
};

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LogIn, (state) => {
            state.value = true;
        })
        .addCase(LogOut, (state) => {
            state.value = false;
        });
});

export default authReducer;
