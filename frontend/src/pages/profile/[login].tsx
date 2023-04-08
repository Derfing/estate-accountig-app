import MainLayout from '@/components/MainLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const Profile = () => {
	const router = useRouter()
	const login = router.query['login']
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'is_loginned'])

  useEffect(() => {
    if (!cookies.is_loginned) {
      router.push('/login')
    }
  }, [])
	
	return (
		<MainLayout>
			<div className="container">
				<h1>Профиль {login}</h1>
			</div>
		</MainLayout>
	)
}

export default Profile