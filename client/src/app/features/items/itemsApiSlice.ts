import { IItemResponse } from '../../api/types'
import { apiSlice } from "../../api/apiSlice";

export const itmesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query<IItemResponse[], void>({
            query: () => '/item/get-all-items'
        }),
    }),
});

export const { useGetAllItemsQuery } = itmesApiSlice