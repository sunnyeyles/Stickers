import { IItemResponse } from '../../api/types'
import { apiSlice } from "../../api/apiSlice";

export const itmesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query<IItemResponse[], void>({
            query: () => '/item/get-all-items'
        }),
        getItemById: builder.query<IItemResponse, string>({
            query: (id) => `/item/get-specific-item/${id}`,
        })
    }),
});

export const { 
   useGetAllItemsQuery,
   useGetItemByIdQuery
} = itmesApiSlice