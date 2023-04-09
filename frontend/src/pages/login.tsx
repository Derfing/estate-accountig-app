import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import { setIsLoginned, setLogin, setPassword, setRole } from '@/store/slices/userSlice'
import API from '@/utils/API'

const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['login', 'password', 'is_loginned', 'role'])
	const [login_, setLogin_] = useState('')
	const [password_, setPassword_] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
  const dispatch = useAppDispatch()

  const handleChangeLogin = (login: string) => dispatch(setLogin({login}))
	const handleChangePassword = (password: string) => dispatch(setPassword({password}))
	const handleChangeIsLoginned = (is_loginned: boolean) => dispatch(setIsLoginned({is_loginned}))
	const handleChangeRole = (role: string) => dispatch(setRole({role}))

	useEffect(() => {
		setLogin_(cookies.login)
		setPassword_(cookies.password)
		console.log(cookies.is_loginned)
	}, [])

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			const response = await API.post('/login', {
				login: login_,
				password: password_
			})
	
			const { status, result } = response.data

			if (status !== 'ok') {
				throw new Error(status)
			}

			const role = result.role

			const TIME = 24 * 60 * 60
	
			setCookie('login', login_, {
				maxAge: TIME
			})
			setCookie('password', password_, {
				maxAge: TIME
			})
			setCookie('is_loginned', true, {
				maxAge: TIME
			})
			setCookie('role', role, {
				maxAge: TIME
			})

			handleChangeLogin(login_)
			handleChangePassword(password_)
			handleChangeIsLoginned(true)
			handleChangeRole(role)
	
			router.push(`/profile/${login_}`)

		} catch (error: any) {
			setError(error.message)
		}
	}

	function handleLoginInput(e: React.ChangeEvent<HTMLInputElement>) {
		setLogin_(e.target.value)
	}

	function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword_(e.target.value)
	}

	return (
		<div className="auth-wrapper">
			<form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
				<input type='text' placeholder='Логин' onChange={handleLoginInput}/>
				<input type='password' placeholder='Пароль' onChange={handlePasswordInput}/>
				<input type='submit'/>
				{error && (
					<p className='auth-error'>Ошибка входа: {error}</p>
				)}
			</form>
		</div>
	)
}

export default Login