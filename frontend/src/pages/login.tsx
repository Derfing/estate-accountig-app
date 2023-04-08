import React, { useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useAppDispatch, useAppSelector } from '@/hooks'
//import authApi from '@/store/api/authService'
import { IUser } from '@/types/user'
import axios from 'axios'
import { useRouter } from 'next/router'

const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['is_loginned'])
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/api/login`, JSON.stringify({
			login,
			password
		}))
		const { is_loginned } = response.data

		console.log('aboba', response)

		setCookie('is_loginned', is_loginned, {
			maxAge: 24 * 60 * 60
		})
		if (is_loginned) {
			router.push('/')
		}
	}
	function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLogin(e.target.value)
	}
	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value)
	}

	return (
		<div className="auth-wrapper">
			<form className='auth-form'>
				<input type='text' placeholder='Логин' onChange={handleLoginChange}/>
				<input type='password' placeholder='Пароль' onChange={handlePasswordChange}/>
				<input type='submit' onClick={() => handleSubmit}/>
			</form>
		</div>
	)
}

export default Login