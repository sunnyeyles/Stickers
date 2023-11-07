import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import Cookies from 'js-cookie';

export type AuthState = {
  user: any
  token: string | null
  isAuthenticated: boolean
  loading?: boolean
}

//we expect to receive the token back after login
export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: Cookies.get('jwt'), isAuthenticated: false } as AuthState,
  reducers: {
    setCredentials: (state:AuthState, action) => {
      const { data } = action.payload
      console.log("action.payload from setCredentials",action.payload)
      state.user = action.payload.user
      //console.log("state.user", state.user)
      state.token = action.payload.accessToken
      state.isAuthenticated = true
      console.log("state.token", state.token)
    },
    logOut: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    signUp: (state, action) => { }
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
