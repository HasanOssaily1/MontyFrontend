import { createReducer } from '@reduxjs/toolkit';
import { View, Add, Edit } from '../actions/userActions';

interface UserPageView {
    value: string;
}

const initialState: UserPageView = {
    value: "list",
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(View, (state) => {
            state.value = "list";
        })
        .addCase(Add, (state) => {
            state.value = "add";
        })
        .addCase(Edit, (state) => {
            state.value = "edit";
        });
});

export default userReducer;