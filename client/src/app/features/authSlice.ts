import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type AuthState = {
    token: string | null
    userName: string | null
    email: string | null
}

//we expect to receive the token back after login
export const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, userName: null, email: null } as AuthState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, userName, userEmail } = action.payload
            state.token = accessToken
            state.userName = userName
            state.email = userEmail
            console.log(state)
        },
        logOut: (state) => {
            state.token = null
            state.userName = null
            state.email = null
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token