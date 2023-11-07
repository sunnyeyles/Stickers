import { apiSlice } from '../../api/apiSlice'
import { IUserResponse, IUserAddressInfo } from '../../api/types'
import { FormSchemaType } from '../../../components/shippingInfoForm/ShippingInfoForm'
import { setProfileImage } from '../users/usersSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserResponse[], void>({
      query: (arg) => ({
        url: '/user/get-all-users',
        method: 'GET',
        data: arg,
      }),
    }),
    getUserById: builder.query<IUserResponse, string>({
      query: (id) => ({
        url: `/user/get-user-by-id/${id}`,
        method: 'GET'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("image from userApiSlice ", data)
          //dispatch(setProfileImage({ data }))
        } catch (err) {
          console.log(err)
        }
      }
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
