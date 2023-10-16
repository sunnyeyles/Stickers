import { apiSlice } from '../../api/apiSlice';
import { IUserResponse } from '../../api/types';

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation<IUserResponse, FormData>({
      query: (data) => {
        return {
          url: '/user/upload-profile-image',
          method: 'POST',
          body: data,
          formData: true
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("image data: ", data)
        } catch (err) {
          console.log(err)
        }
      }
    })
  }),
});

export const {
  useUploadMutation
} = uploadApiSlice