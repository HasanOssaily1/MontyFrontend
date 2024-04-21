import { createAction } from '@reduxjs/toolkit';
import { User } from '../../services/UsersService';

// Action 
export const setUser = createAction<User>("setUser");
export const View = createAction("View");
export const Add = createAction("Add");
export const Edit = createAction("Edit");