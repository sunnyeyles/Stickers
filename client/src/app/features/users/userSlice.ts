import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'


export type User = {
  user: any | null
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
  } as User,
  reducers: {
    setUser: (state, action) => {
      //console.log("set user payload: ", action.payload)
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
      state.isAuthenticated = true
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
    unsetUser: (state) => {
      //console.log("unset user payload: ", action.payload)
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    updateProfileImage: (state, action) => {
      const { profileImagePath } = action.payload
      state.user.profileImage = profileImagePath
    }
  },
})

export const { setUser, updateUserAddress, unsetUser, updateProfileImage } = userSlice.actions

export const selectProfileImage = (state: RootState) => {
  return state.userState.user
}

export default userSlice.reducer
