import MainLayout from '@/components/MainLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { IObject } from '@/types/object'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

interface ServerSideProps {
	first_name: string
	last_name: string
	patronymic: string
	speciality: string
	objects: IObject[]
}

const Profile = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	let login = router.query['login']
  const [cookies, setCookie, removeCookie] = useCookies(['login', 'is_loginned'])

	const first_name = data.first_name
	const last_name = data.last_name
	const patronymic = data.patronymic

	let objects = []
	for (let key in data.objects) {
		objects.push({...data.objects[key], id: Number(key)})
	}

  useEffect(() => {
    if (!cookies.is_loginned) {
      router.push('/login')
    }
		router.query['login'] = cookies.login
  }, [])
	
	return (
		<MainLayout>
			<div className="container profile-global-wrapper">
				<section className='profile-section login-section'>
					<div className="profile-content">
						<span className='login-label'>Логин:</span> {login}
					</div>
				</section>
				<section className='profile-section fio-section'>
					<div className="profile-content">
						<span className='worker-FIO'>{last_name} {first_name} {patronymic}</span><br/>
						<label className='speciality-label'>{data.speciality}</label>
					</div>
				</section>
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
	
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/api/profile/${login}`)
	const data: ServerSideProps = response.data

	return {
		props: {
			data
		}
	}
}

export default Profile