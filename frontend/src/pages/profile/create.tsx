import MainLayout from '@/components/MainLayout'
import { useAppDispatch, useAppSelector } from '@/hooks'
import API from '@/utils/API'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Create = () => {
	const router = useRouter()

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [speciality, setSpeciality] = useState('')

	const [role, setRole] = useState(useAppSelector(state => state.user.role))
	const myLogin = useAppSelector(state => state.user.login)

	const [validateError, setValidateError] = useState<null | string>(null)

	useEffect(() => {
		if (role !== 'ГИН') {
			router.push(`/profile/${myLogin}`)
		}
	}, [])

	function validate() {
		return login.length && password.length && firstname.length && lastname.length && patronymic.length && speciality.length;
	}

	function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!validate()) {
			setValidateError('Заполните все поля!')
			return
		}
		
		API.post('/profile/create', {
			login,
			password,
			firstname,
			lastname,
			patronymic,
			speciality
		})
		
		setLogin('')
		setPassword('')
		setFirstname('')
		setLastname('')
		setPatronymic('')
		setSpeciality('')

		setValidateError('')
	}

	return (
		<MainLayout>
			<div className="container">
				<h1>Добавить сотрудника</h1>
				<form className='form-create-user' onSubmit={handleSubmitForm}>
					<section className='create-user-section'>
						<label>Логин: </label>
						<input type='text' value={login} onChange={e => setLogin(e.target.value)}/>
					</section>
					<section className='create-user-section'>
						<label>Пароль: </label>
						<input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
					</section>
					<section className='create-user-section'>
						<label>Фамилия: </label>
						<input type='text' value={lastname} onChange={e => setLastname(e.target.value)}/>
					</section>
					<section className='create-user-section'>
						<label>Имя: </label>
						<input type='text' value={firstname} onChange={e => setFirstname(e.target.value)}/>
					</section>
					<section className='create-user-section'>
						<label>Отчество: </label>
						<input type='text' value={patronymic} onChange={e => setPatronymic(e.target.value)}/>
					</section>
					<section className='create-user-section'>
						<label>Специальность: </label>
						<input type='text' value={speciality} onChange={e => setSpeciality(e.target.value)}/>
					</section>
					<div className="create-user-section">
						<button onClick={() => handleSubmitForm}>Создать</button>
					</div>
					{
						validateError && <div className='error-block'>{validateError}</div>
					}
				</form>
			</div>
		</MainLayout>
	)
}

export default Create