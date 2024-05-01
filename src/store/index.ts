import { configureStore } from '@reduxjs/toolkit'
import tasksDatesSlice from './tasksDatesSlice'
import dealSettingsSlice from './dealSettings'

const store = configureStore({
  reducer: {
    tasksDates:tasksDatesSlice,
    dealSettings:dealSettingsSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch