import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['login', 'password', 'is_loginned'])
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter();

	useEffect(() => {
		setLogin(cookies.login)
		setPassword(cookies.password)
		console.log(cookies.is_loginned)
	}, [])

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/api/login`, {
				login,
				password
			})
	
			const { status } = response.data
			console.log('login', response.data)

			if (status == 1) {
				throw new Error('Сотрудника с таким логином не найдено')
			}
	
			if (status == 2) {
				throw new Error('Неверный пароль')
			}
	
			setCookie('login', login, {
				maxAge: 24 * 60 * 60
			})

			setCookie('password', password, {
				maxAge: 24 * 60 * 60
			})

			setCookie('is_loginned', true, {
				maxAge: 24 * 60 * 60
			})
	
			router.push(`/profile/${login}`)

		} catch (error: any) {
			setError(error.message)
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