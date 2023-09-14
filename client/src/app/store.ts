import { configureStore } from '@reduxjs/toolkit'

export const  store = configureStore({
    reducer: {

    },
})

export type AppDispatch = typeof store.dispatch
export type RoostState = ReturnType<typeof store.getState>