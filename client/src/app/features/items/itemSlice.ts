import { IItemResponse } from '../../api/types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IItemState {
    item: IItemResponse | null
}

const initialState: IItemState = {
    item: null
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        // itemState: (state, action: PayloadAction<IItemResponse>) => {
        //     state.item = action.payload
        // },
    },
})

export default itemSlice.reducer

//export const { itemState } = itemSlice.actions