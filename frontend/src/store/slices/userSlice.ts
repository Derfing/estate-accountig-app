import { IUserLogin, SetLoginAction, SetPasswordAction, SetIsLoginnedAction, SetRoleAction } from "@/types/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IUserLogin = {
	login: '',
	password: '',
	is_loginned: false,
	role: 'ГОС_ОРГАН'
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
		setRole: (state: IUserLogin, action: PayloadAction<SetRoleAction>) => {
			state.role = action.payload.role
		},
	}
})

export const { setIsLoginned, setLogin, setPassword, setRole } = userSlice.actions
export default userSlice