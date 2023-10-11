import { apiSlice } from '../../api/apiSlice';

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: ({data}) => ({
          url: '/user/upload-profile-image',
          method: 'POST',
          body: data,
          formData: true
      }),
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

export const { useUploadMutation } = uploadApiSlice