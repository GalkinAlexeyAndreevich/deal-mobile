import { configureStore } from '@reduxjs/toolkit'
import dealSettingsSlice from './dealSettings'

const store = configureStore({
  reducer: {
    dealSettings:dealSettingsSlice
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch