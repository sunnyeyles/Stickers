import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserAddressInfo } from './types'

const BASE_URL: string = 'http://localhost:3000'

export const userApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  endpoints: (builder) => ({
    getAllItems: builder.query<IShippingInfoFormData, void>({
      // need to work out what the best enpoint would be, user could either use this data only for this order OR update their shipping info
      query: () => '/user',
    }),
  }),
})

export const { useGetAllItemsQuery } = userApi
