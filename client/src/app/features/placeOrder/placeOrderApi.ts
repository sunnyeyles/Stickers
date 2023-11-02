import { apiSlice } from '../../api/apiSlice'
import { IItemResponse } from '../../api/types'

export const placeOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyCheckout: builder.mutation<any,{userId: string, shoppingCart: IItemResponse[]}>({
      query: (data) => {
        console.log("DATA:", data)
        return {
          url: '/item/verify-checkout',
          method: 'POST',
          body: data
        }
      }
    })
  }),
})

export const { useVerifyCheckoutMutation }  = placeOrderApi
