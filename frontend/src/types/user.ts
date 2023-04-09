export interface IUserLogin {
	login: string
	password: string
	is_loginned: boolean
	role: string
}

export interface SetLoginAction {
	login: string
}

export interface SetPasswordAction {
	password: string
}

export interface SetIsLoginnedAction {
	is_loginned: boolean
}

export interface SetRoleAction {
	role: string
}