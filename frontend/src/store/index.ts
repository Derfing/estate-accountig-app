import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
//import authApi from './api/authService'
import pageSlice from './slices/pageSlice'

const store = configureStore({
	reducer: {
		curPage: pageSlice.reducer,
		//[authApi.reducerPath]: authApi.reducer,
	},
	//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch