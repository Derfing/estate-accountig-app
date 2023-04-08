import { configureStore } from '@reduxjs/toolkit'
import pageSlice from './slices/pageSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
	reducer: {
		curPage: pageSlice.reducer,
		user: userSlice.reducer
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch