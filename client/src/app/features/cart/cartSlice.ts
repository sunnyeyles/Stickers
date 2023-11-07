import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, IItemResponse } from '../../api/types'
import { RootState } from '../../store'

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as CartItem[],
    reducers: {
        addItemToCart: (state, action: PayloadAction<{ addedItem: IItemResponse, selectedAmount: number }>) => {
            const { addedItem, selectedAmount } = action.payload
            // parse the string to a number
            const quantity: number = selectedAmount
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
            if (itemIndex !== -1) {
                state.splice(itemIndex)
            }
        },
        changeQuantityItemFromCart: (state, action: PayloadAction<{ addedItem: IItemResponse, amount: number }>) => {
            const { addedItem, amount } = action.payload
            const itemIndex = state.findIndex(item => item._id === addedItem._id)
            if (itemIndex !== -1) {
                state[itemIndex].quantity = amount
            } else {
                state.push({ ...action.payload.addedItem, quantity: amount })
            }
        }
    },
})

export const {
    addItemToCart,
    removeItemFromCart,
    changeQuantityItemFromCart
} = cartSlice.actions

export const getCartItems = (state: RootState) => state.cart
// we loop trough all cart products and multiply the amount with price
export const getTotalPrice = (state: RootState) => {
    const totalPrice = state.cart.reduce((acc, next) => {
        const itemPrice = parseFloat(next.itemPrice);
        const itemTotal = next.quantity * itemPrice;
        return acc + itemTotal
    }, 0)
    return totalPrice.toFixed(2)
}

export const getTotalAmountOfItems = (state: RootState) => state.cart.reduce((acc, next) => acc += (next.quantity), 0)

export default cartSlice.reducer