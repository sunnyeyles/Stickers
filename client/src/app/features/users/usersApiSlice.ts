import { apiSlice } from '../../api/apiSlice'
import { IUserResponse, IUserAddressInfo } from '../../api/types'

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
    updateUserAddress: builder.mutation<void, { address: IUserAddressInfo }>({
      query: (arg) => ({
        url: '/user/update-address',
        method: 'Put',
        data: arg,
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
