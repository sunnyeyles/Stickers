import { apiSlice } from '../../api/apiSlice';
import { IUserResponse } from '../../api/types';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserResponse[], void>({
      query: () => '/user/get-all-users',
    }),
    getUserById: builder.mutation<IUserResponse, { id: string }>({
      query: (arg) => ({
        url: '/user/get-user-by-id',
        method: 'GET',
        params: { ...arg }
      }),
    })
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdMutation } = usersApiSlice
