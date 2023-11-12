import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IUser } from '../../api/types'
export type UserWithCredentials = {
  // need to fix this any type and replace it with IUser
  user: any | null
  token: string | null
  isAuthenticated: boolean
  loading?: boolean
}
// we expect to receive the token back after login
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  } as UserWithCredentials,
  reducers: {
    // login
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.accessToken
      state.isAuthenticated = true
      console.log('USER SET!!!!!', state.token)
    },
    // log out
    unsetUser: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    // set or update the users address
    updateUserAddress: (state, action) => {
      return {
        ...state,
        user: {
          address: action.payload,
        },
      }
    },
    // upload profile image
    updateProfileImage: (state, action) => {
      const { profileImagePath } = action.payload
      state.user.profileImage = profileImagePath
    },
  },
})

export const { setUser, updateUserAddress, unsetUser, updateProfileImage } =
  userSlice.actions

export const selectProfileImage = (state: RootState) => {
  return state.userState.user
}

export default userSlice.reducer
