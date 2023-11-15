import { apiSlice } from '../../api/apiSlice'
import { IUserAddressInfo, IUserAddressInfoWithId } from '../../api/types'
import { IUser } from '../../api/types'
import { FormSchemaType } from '../../../components/form/loginForm/LoginForm'
import { setUser, unsetUser } from './userSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, FormSchemaType>({
      query: (credentials: any) => ({
        url: '/user/authenticate-user',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/user/user-log-out',
        method: 'POST',
      }),
      //we verify that query has fullfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //console.log("logout data: ", data)
          //sets token to null in local state
          dispatch(unsetUser())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: '/user/refresh-token',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //console.log("accessToken from refresh endpoint ", data)
          dispatch(setUser({ data }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    getAllUsers: builder.query<IUser[], void>({
      query: (arg) => ({
        url: '/user/get-all-users',
        method: 'GET',
        data: arg,
      }),
    }),
    getUserById: builder.query<IUser, { id: string }>({
      query: (arg) => ({
        url: '/user/get-user-by-id',
        method: 'GET',
        data: arg,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('image from userApiSlice ', data)
          //dispatch(setProfileImage({ data }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    getUserAddress: builder.query<IUserAddressInfo, { id: string }>({
      query: (arg) => ({
        url: '/user/get-user-address',
        method: 'GET',
        data: arg,
      }),
    }),
    updateUserAddress: builder.mutation<
      IUserAddressInfo,
      IUserAddressInfoWithId
    >({
      query: (addressInfoAndId) => ({
        url: '/user/update-user-address',
        method: 'PUT',
        body: addressInfoAndId,
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
