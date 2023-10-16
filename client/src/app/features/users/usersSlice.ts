import { IUserResponse } from '../../api/types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type UserState = {
    user: IUserResponse | null
}

const initialState : UserState = {
    user: null
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserResponse>) => {
            state.user = action.payload 
        }
    },
})

export const { setUser } = usersSlice.actions

export default usersSlice.reducer
