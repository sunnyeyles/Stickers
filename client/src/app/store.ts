import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userReducer from './features/users/userSlice'
import { apiSlice } from './api/apiSlice'
import itemReducer from './features/items/itemSlice'
import userAddressInfoReducer from './features/users/userAddressInfoSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    item: itemReducer,
    userState: userReducer,
    userAddress: userAddressInfoReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
