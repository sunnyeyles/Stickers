import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../api/types';
import { RootState } from '../store';

type AuthState = {
    user: IUser | null,
    token: string | null
}

export const authSlice = createSlice({
    name:'auth',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
       setCredentials: (
        state,
        { payload: { user, token }}: PayloadAction<{ user: IUser; token: string }>
       ) => {
        state.user = user
        state.token = token
       },
    },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user