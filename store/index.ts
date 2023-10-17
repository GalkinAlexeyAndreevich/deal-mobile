import { configureStore } from '@reduxjs/toolkit'
import citySlice from './citySlice'

const store = configureStore({
  reducer: {
    city:citySlice
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch