import { IShippingInfoFormData } from '../../api/types'
import { apiSlice } from '../../api/apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<IShippingInfoFormData, void>({
      // need to work out what the best enpoint would be, user could either use this data only for this order OR update their shipping info
      query: () => '/user',
    }),
  }),
})

export const { useGetAllItemsQuery } = userApi
