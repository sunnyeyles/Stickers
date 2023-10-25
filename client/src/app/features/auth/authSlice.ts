import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export type AuthState = {
  user: any
  token: string | null
  isAuthenticated: boolean
  loading?: boolean
}

//we expect to receive the token back after login
export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      //console.log("action.payload from setCredentials",action.payload)
      state.user = user
      //console.log("accessToken", accessToken)
      state.token = accessToken
      state.isAuthenticated = true
      //console.log("user from auth login", user)
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
