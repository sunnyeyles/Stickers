import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IItemResponse } from '../../api/types'
import { RootState } from '../../store'
import { AmountType } from '../../../pages/item/Item';

export interface CartItem extends IItemResponse {
    quantity: number;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as CartItem[],
    reducers: {
        addItemToCart: (state, action: PayloadAction<{ addedItem: IItemResponse, selectedAmount: AmountType }>) => {
            const { addedItem, selectedAmount } = action.payload
            console.log("addedItem", addedItem)
            console.log("selectedAmount", selectedAmount)
            // parse the string to a number
            const quantity: number = parseInt(selectedAmount.amount)
            // we need to check if item is already in the cart
            const itemIndex = state.findIndex(item => item._id === addedItem._id)
            //if item exists, add the selected amount
            if (itemIndex !== -1) {
                state[itemIndex].quantity += quantity
            } else {
                state.push({ ...action.payload.addedItem, quantity: quantity })
            }
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const itemIndex = state.findIndex(item => item._id === action.payload)
            if (state[itemIndex].quantity > 1) {
                state[itemIndex].quantity -= 1
            } else {
                return state.filter(item => item._id !== action.payload)
            }
        }
    },
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions

export const getCartItems = (state: RootState) => state.cart
// we loop trough all cart products and multiply the amount with price
export const getTotalPrice = (state: RootState) =>
    state.cart.reduce((acc, next) => acc += (next.quantity * parseInt(next.itemPrice)), 0)

export default cartSlice.reducer