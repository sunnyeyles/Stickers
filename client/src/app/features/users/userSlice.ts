// import { IUser } from '../../api/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export type IUser = {
  user: any
  token: string | null
  isAuthenticated: boolean
  loading?: boolean
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  } as IUser,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
      state.isAuthenticated = true
      console.log('User state', user)
    },
    updateUserAddress: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload,
        },
      }
    },
  },
})

export const { setUser, updateUserAddress } = userSlice.actions

export default userSlice.reducer
