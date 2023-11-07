import { IUserResponse, IUser, IUserAddressInfo } from '../../api/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export type UserState = {
  user: IUserResponse | null
}

const initialState: UserState = {
  user: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload
    },
    // setUser: (state, action) => {
    //   const { user, accessToken } = action.payload
    //   //console.log("action.payload from setCredentials",action.payload)
    //   state.user = user
    //   //console.log("accessToken", accessToken)
    //   state.token = accessToken
    //   state.isAuthenticated = true
    //   //console.log("user from auth login", user)
    // },

    updateUserAddress: (state, action: PayloadAction<IUserAddressInfo>) => {
      return { ...state, ...action.payload }
    },
    setProfileImage: (state:UserState, action) => {
      // const { data } = action.payload
      // console.log("action.payload from setProfileImage",action.payload, data)
      //state.user?.user.profileImage = 
    }
  },
})

export const { setUser, updateUserAddress, setProfileImage } = usersSlice.actions
// export const getUserId = (state: RootState) => state.userState.user?.user._id
export const getUserId = (state: RootState) => state.userState.user

export default usersSlice.reducer
