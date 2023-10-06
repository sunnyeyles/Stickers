import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserResponse } from './types'
import { FormSchemaType } from '../../components/loginForm/LoginForm'
import { RootState } from '../store'
import { logOut } from '../features/authSlice'

const BASE_URL: string = 'http://localhost:3000'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      //if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, FormSchemaType>({
      query: (credentials) => ({
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
          console.log('logout data: ', data)
          //sets token to null in local state
          dispatch(logOut())
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/user/refresh-token',
        method: 'GET',
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/create-user',
        method: 'POST',
        body: { ...userData },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
} = authApi
