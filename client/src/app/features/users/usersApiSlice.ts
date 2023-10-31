import { apiSlice } from '../../api/apiSlice'
import { IUserResponse, IUserAddressInfo } from '../../api/types'
import { FormSchemaType } from '../../../components/shippingInfoForm/ShippingInfoForm'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserResponse[], void>({
      query: (arg) => ({
        url: '/user/get-all-users',
        method: 'GET',
        data: arg,
      }),
    }),
    getUserById: builder.query<IUserResponse, { id: string }>({
      query: (arg) => ({
        url: '/user/get-user-by-id',
        method: 'GET',
        data: arg,
      }),
    }),
    getUserAddress: builder.query<IUserAddressInfo, { id: string }>({
      query: (arg) => ({
        url: '/user/get-user-address',
        method: 'Get',
        data: arg,
      }),
    }),
    // check api docs for what is returned and replace void with it
    updateUserAddress: builder.mutation<void, FormSchemaType>({
      query: (data) => ({
        url: '/user/update-address',
        method: 'Put',
        body: data,
        // data: data,
      }),
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserAddressQuery,
  useUpdateUserAddressMutation,
} = usersApiSlice
