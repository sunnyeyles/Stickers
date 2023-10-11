import { createSlice } from '@reduxjs/toolkit'

type UploadState = {
  email: string | null
  profileImage: File | null
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: { email: null, profileImage: null} as UploadState,
  reducers: {
    uploadImage: (state, action) => {
      const { profileImage } = action.payload
      state.profileImage = profileImage
    },
  },
})

export const { uploadImage } = uploadSlice.actions

export default uploadSlice.reducer

export const selectUserEmail = (state: { upload: UploadState }) => state.upload.email
export const selectProfileImage = (state: { upload: UploadState }) => state.upload.profileImage