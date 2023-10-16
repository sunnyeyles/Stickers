import { createSlice } from '@reduxjs/toolkit'

type UploadState = {
  email: string | null
  profileImage: File | null
  imagePath : string
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: { email: null, profileImage: null, imagePath: ""} as UploadState,
  reducers: {
    uploadImage: (state, action) => {
      const { profileImage } = action.payload
      state.imagePath = profileImage
    },
  },
})

export const { uploadImage } = uploadSlice.actions

export default uploadSlice.reducer