import { createReducer } from '@reduxjs/toolkit';
import { setUser } from '../actions/userActions';
import { User } from '../../services/UsersService';

interface UserDetails {
    value: User;
}

const initialState: UserDetails = {
    value: {
        id: 0,
        name: "",
        email: "",
        password: "",
        modificationdate: null,
        creationdate: null
    },
};

const userDetailsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.value = action.payload;
        })
});

export default userDetailsReducer;