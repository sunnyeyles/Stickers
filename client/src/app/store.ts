import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
// import { itmesApi } from './api/itemsApi'
// import itemReducer from './features/items/itemSlice'
// import {
//   userAddressInfoSlice,
//   setAddressInfoState,
// } from './features/users/userAddressInfoSlice'
import { apiSlice } from './api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // itemState: itemReducer,
    // addressInfo: userAddressInfoSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
