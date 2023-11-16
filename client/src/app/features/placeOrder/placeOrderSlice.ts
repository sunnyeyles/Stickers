import { createSlice } from '@reduxjs/toolkit'
import { IOrderResponse } from '../../api/types'

export type OrdersState = {
    orders: IOrderResponse[]
}

export const placeOrderSlice = createSlice({
    name: 'placeOrder',
    initialState: { orders: [] } as OrdersState,
    reducers: {
        setOrders: (state, action) => {
            console.log("action payload orders", action.payload)
            state.orders = action.payload
        },

    },
})

export const { setOrders } = placeOrderSlice.actions

export default placeOrderSlice.reducer
