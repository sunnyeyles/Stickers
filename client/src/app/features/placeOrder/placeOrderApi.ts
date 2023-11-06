import { apiSlice } from '../../api/apiSlice'
import { IItemResponse } from '../../api/types'

export const placeOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyCheckout: builder.mutation<any,{userId: string, shoppingCart: IItemResponse[]}>({
      query: (data) => {
        return {
          url: '/item/verify-checkout',
          method: 'POST',
          body: data
        }
      }
    }),
    stripeCheckout: builder.mutation<any, {userId: string, token: string, shoppingCart: IItemResponse[]}>({
      query: (data) => {
        console.log("DATA STRIPE CHECKOUT:", data) 
        return {
          url: '/item/create-checkout-session',
          method: 'POST',
          body: data
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("stripe response Data ", data)
          const { url } = data
          if(url){
            window.location.href = url
          }
        } catch (err) {
          console.log(err)

        }
      }
    })
  }),
})

export const { 
  useVerifyCheckoutMutation,
  useStripeCheckoutMutation
}  = placeOrderApi
