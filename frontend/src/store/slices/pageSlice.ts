import { PageState, SetCurPageAction } from "@/types/page"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: PageState = {
	curPageId: 0
}

const pageSlice = createSlice({
	name: 'curPage',
	initialState,
	reducers: {
		setCurPage: (state: PageState, action: PayloadAction<SetCurPageAction>) => {
			state.curPageId = action.payload.curPageId
		}
	}
})

export const { setCurPage } = pageSlice.actions
export default pageSlice