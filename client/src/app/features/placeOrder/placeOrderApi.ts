import { apiSlice } from '../../api/apiSlice'
import { CartItem } from '../../api/types'

export const placeOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyCheckout: builder.mutation<any,CartItem[]>({
      query: (data) => {
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
