import { configureStore } from '@reduxjs/toolkit'
import dealSettingsSlice from './dealSettings'
import tasksDatesSlice from './tasksDatesSlice'

const store = configureStore({
  reducer: {
    dealSettings:dealSettingsSlice,
    tasksDates:tasksDatesSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch