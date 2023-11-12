import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userReducer from './features/users/userSlice'
import { apiSlice } from './api/apiSlice'
import itemReducer from './features/items/itemSlice'
import cartReducer from './features/cart/cartSlice'
import uploadReducer from './features/upload/uploadSlice'
import userAddressInfoReducer from './features/users/userAddressInfoSlice'
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
// You can choose different storage options
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: persistedReducer,
    auth: authReducer,
    userState: userReducer,
    item: itemReducer,
    userAddress: userAddressInfoReducer,
    upload: uploadReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
