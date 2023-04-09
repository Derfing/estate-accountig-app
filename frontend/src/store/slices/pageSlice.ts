import { PageState, SetCurPageAction } from "@/types/page"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: PageState = {
	curPageIndex: 0
}

const pageSlice = createSlice({
	name: 'curPage',
	initialState,
	reducers: {
		setCurPage: (state: PageState, action: PayloadAction<SetCurPageAction>) => {
			state.curPageIndex = action.payload.curPageIndex
		}
	}
})

export const { setCurPage } = pageSlice.actions
export default pageSlice