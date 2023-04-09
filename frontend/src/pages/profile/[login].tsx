import MainLayout from '@/components/MainLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IObject } from '@/types/object'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import API from '@/utils/API'

interface ServerSideProps {
	first_name: string
	last_name: string
	patronymic: string
	speciality: string
	objects: IObject[]
}

const Profile = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	let loginFromURL = router.query['login']
  const [cookies, setCookie, removeCookie] = useCookies(['login', 'is_loginned'])

	const [changeProfileMode, setChangeProfileMode] = useState(false)

	const [login, setLogin] = useState(loginFromURL)
	const [firstname, setFirstname] = useState(data.first_name)
	const [lastname, setLastname] = useState(data.last_name)
	const [patronymic, setPatronymic] = useState(data.patronymic)
	const [speciality, setSpeciality] = useState(data.speciality)
	const [counter, setCounter] = useState(0)

	let objects = []
	for (let key in data.objects) {
		objects.push({...data.objects[key], id: Number(key)})
	}

  useEffect(() => {
    if (!cookies.is_loginned) {
      router.push('/login')
    }
  }, [])

	async function fetchUser(): Promise<ServerSideProps> {
		const data = await API.get<ServerSideProps>(`/profile/${login}`).then(response => response.data)
		return data
	}

	useEffect(() => {
		fetchUser()
			.then(response => {
				setFirstname(response.first_name)
				setLastname(response.last_name)
				setPatronymic(response.patronymic)
				setSpeciality(response.speciality)
			})
	}, [counter])

	async function handleChangeProfileMode() {
		if (changeProfileMode) {

			const data = await API.put(`${process.env.NEXT_PUBLIC_API_URL}/profile/${login}/edit`, {
				firstname, lastname, patronymic, speciality
			})
				.then(response => response.data)
			
			console.log(data)
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
	
	return (
		<MainLayout>
			<div className="container profile-global-wrapper">
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
				{
					changeProfileMode 
						? <button className='change-profile-btn save-btn' onClick={handleChangeProfileMode}>Сохранить изменения</button> 
						: <button className='change-profile-btn change-btn' onClick={handleChangeProfileMode}>Изменить профиль</button>
				}
				
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
	//console.log(data)

	return {
		props: {
			data
		}
	}
}

export default Profile