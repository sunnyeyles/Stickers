import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type AuthState = {
    token: string | null
}

export const authSlice = createSlice({
    name:'auth',
    initialState: { token: null } as AuthState,
    reducers: {
       setCredentials: (state, action) => {
        const { accessToken } = action.payload
        //state.user = user
        state.token = accessToken
       },
       logOut: (state, action) => {
        state.token = null
       }
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token