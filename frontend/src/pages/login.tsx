import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import { setIsLoginned, setLogin, setPassword } from '@/store/slices/userSlice'
import API from '@/utils/API'

const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['login', 'password', 'is_loginned'])
	const [login_, setLogin_] = useState('')
	const [password_, setPassword_] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
  const dispatch = useAppDispatch()

  const handleChangeLogin = (login: string) => dispatch(setLogin({login}))
	const handleChangePassword = (password: string) => dispatch(setPassword({password}))
	const handleChangeIsLoginned = (is_loginned: boolean) => dispatch(setIsLoginned({is_loginned}))

	useEffect(() => {
		setLogin_(cookies.login)
		setPassword_(cookies.password)
		console.log(cookies.is_loginned)
	}, [])

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			const response = await API.post('/api/login', {
				login: login_,
				password: password_
			})
	
			const { status } = response.data

			if (status == 1) {
				throw new Error('Сотрудника с таким логином не найдено')
			}
			if (status == 2) {
				throw new Error('Неверный пароль')
			}
	
			setCookie('login', login_, {
				maxAge: 24 * 60 * 60
			})
			setCookie('password', password_, {
				maxAge: 24 * 60 * 60
			})
			setCookie('is_loginned', true, {
				maxAge: 24 * 60 * 60
			})

			handleChangeLogin(login_)
			handleChangePassword(password_)
			handleChangeIsLoginned(true)
	
			router.push(`/profile/${login_}`)

		} catch (error: any) {
			setError(error.message)
		}
	}

	function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLogin_(e.target.value)
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword_(e.target.value)
	}

	return (
		<div className="auth-wrapper">
			<form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
				<input type='text' placeholder='Логин' onChange={handleLoginChange}/>
				<input type='password' placeholder='Пароль' onChange={handlePasswordChange}/>
				<input type='submit'/>
				{error && (
					<p className='auth-error'>Ошибка входа: {error}</p>
				)}
			</form>
		</div>
	)
}

export default Login