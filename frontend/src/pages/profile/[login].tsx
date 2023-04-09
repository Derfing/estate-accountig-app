import MainLayout from '@/components/MainLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IPropertyInProfile } from '@/types/property'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import API from '@/utils/API'
import { useAppSelector } from '@/hooks'

interface ServerSideProps {
	status: string
	result: {
		first_name: string
		last_name: string
		patronymic?: string
		speciality: string
		role: string
		objects: IPropertyInProfile[]
	}
}

const Profile = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	let loginFromURL = router.query['login']

	const [changeProfileMode, setChangeProfileMode] = useState(false)
	const [counter, setCounter] = useState(0)

	const user = useAppSelector(state => state.user)

	const [login, setLogin] = useState(loginFromURL)
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [speciality, setSpeciality] = useState('')
	const [role, setRole] = useState('')

	let objects = []
	if (data.result) {
		for (let key in data.result.objects) {
			objects.push({...data.result.objects[key], id: Number(key)})
		}
	}
	
  useEffect(() => {
    if (!user.is_loginned) {
      router.push('/login')
    }
		if (data && data.result) {
			setFirstname(data.result.first_name)
			setLastname(data.result.last_name)
			const patronymic = data.result.patronymic
			setPatronymic(patronymic ? patronymic : '')
			setSpeciality(data.result.speciality)
			setRole(data.result.role)
		}
  }, [])

	async function fetchUser(): Promise<ServerSideProps> {
		const data = await API.get<ServerSideProps>(`/profile/${login}`).then(response => response.data)
		return data
	}

	useEffect(() => {
		fetchUser()
			.then(response => response.result)
	}, [counter])

	async function handleChangeProfileMode() {
		if (changeProfileMode) {
			const data = await API.put(`/profile/${login}/edit`, {
				firstname, lastname, patronymic, speciality
			})
				.then(response => response.data)
			setCounter(prev => prev + 1)
		}
		setChangeProfileMode(prev => !prev)
	}
	
	function handleChangeFirstname(e: React.ChangeEvent<HTMLInputElement>) {
		setFirstname(e.target.value)
	}
	function handleChangeLastname(e: React.ChangeEvent<HTMLInputElement>) {
		setLastname(e.target.value)
	}
	function handleChangePatronymic(e: React.ChangeEvent<HTMLInputElement>) {
		setPatronymic(e.target.value)
	}
	function handleChangeSpeciality(e: React.ChangeEvent<HTMLInputElement>) {
		setSpeciality(e.target.value)
	}

	async function handleDeleteUser() {
		API.delete(`/profile/${login}/delete`)
		if (user.login === login) {
			router.push('/login')
		} else {
			router.push(`/profile/${user.login}`)
		}
	}

	function handleCreateUser() {
		router.push('/profile/create')
	}
	
	return (
		<MainLayout>
			<div className="container profile-global-wrapper">
				<h1>Профиль</h1>
				<section className='profile-section login-section'>
					<div className="profile-content">
						<span className='login-label'>Логин: </span>{login}
					</div>
				</section>
				<section className='profile-section fio-section'>
					<div className="profile-content">
						<span className='worker-FIO'>{!changeProfileMode ? lastname : <input type='text' value={lastname} onChange={handleChangeLastname}/>} {!changeProfileMode ? firstname : <input type='text' value={firstname} onChange={handleChangeFirstname}/>} {!changeProfileMode ? patronymic : <input type='text' value={patronymic} onChange={handleChangePatronymic}/>}{!changeProfileMode ? <br/> : ''}</span>
						{
							!changeProfileMode
								? <label className='speciality-label'>{speciality}</label>
								: <input className='input-speciality' type='text' value={speciality} onChange={handleChangeSpeciality}/>
						}
						</div>
				</section>
				<section className='profile-section role-section'>
					<div className="profile-content">
						<span className='role-label'>Роль: </span>{role}
					</div>
				</section>
				<div className="btns">
					<button className='change-profile-btn delete-btn' onClick={handleDeleteUser}>Удалить сотрудника</button> 
					{
						changeProfileMode 
							? <button className='change-profile-btn save-btn' onClick={handleChangeProfileMode}>Сохранить изменения</button>
							: <button className='change-profile-btn change-btn' onClick={handleChangeProfileMode}>Изменить профиль</button>
					}
					{
						role === 'ГИН' && <button onClick={handleCreateUser} className='change-profile-btn create-user-btn'>Создать сотрудника</button>
					}
				</div>
				<section className='profile-section active-objects'>
					<div className="profile-content">
						<h2>Действующие объекты</h2>
						{
							objects.map(({id, decision, street, home}) => (
								<div className='obj-wrapper' key={id}>
									<div className='obj-info'>
										<div className='obj-name'>Объект №{id}: {decision}</div>
										<div className='obj-address'>{street}{home ? `, ${home}` : ''}</div>
									</div>
									<div className='see-task'>
										<Link href={`/object/${id}`}>Посмотреть задачу</Link>
									</div>
								</div>
							))
						}
					</div>
				</section>
			</div>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{ data: ServerSideProps }> = async (context) => {
	const login = context.query['login']
	const data: ServerSideProps = await API.get(`/profile/${login}`).then(response => response.data)

	return {
		props: {
			data
		}
	}
}

export default Profile