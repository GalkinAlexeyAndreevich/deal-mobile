import { configureStore } from '@reduxjs/toolkit'
import tasksDatesSlice from './tasksDatesSlice'

const store = configureStore({
  reducer: {
    tasksDates:tasksDatesSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch