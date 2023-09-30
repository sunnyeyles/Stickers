import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserResponse } from './types';
import { FormSchemaType } from '../../components/loginForm/LoginForm'
import { RootState } from '../store';

const BASE_URL: string = "http://localhost:3000"

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
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: '/user/user-log-out',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("logout data: ", data)
        } catch (err) {
          console.log(err)
        }
      }
    })
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;