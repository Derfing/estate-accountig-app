import MainLayout from '@/components/MainLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { IObject } from '@/types/Object'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

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

  useEffect(() => {
    if (!cookies.is_loginned) {
      router.push('/login')
    }
		router.query['login'] = cookies.login
  }, [])
	
	return (
		<MainLayout>
			<div className="container">
				<section>
					<span className='login-label'>Логин:</span> {login}
				</section>
				<section>
					{last_name} {first_name} {patronymic}
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