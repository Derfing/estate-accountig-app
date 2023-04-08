import { IUserLogin, SetLoginAction, SetPasswordAction, SetIsLoginnedAction } from "@/types/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IUserLogin = {
	login: '',
	password: '',
	is_loginned: false
}

const userSlice = createSlice({
	name: 'curPage',
	initialState,
	reducers: {
		setIsLoginned: (state: IUserLogin, action: PayloadAction<SetIsLoginnedAction>) => {
			state.is_loginned = action.payload.is_loginned
		},
		setLogin: (state: IUserLogin, action: PayloadAction<SetLoginAction>) => {
			state.login = action.payload.login
		},
		setPassword: (state: IUserLogin, action: PayloadAction<SetPasswordAction>) => {
			state.password = action.payload.password
		},
	}
})

export const { setIsLoginned, setLogin, setPassword } = userSlice.actions
export default userSlice