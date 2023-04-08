import { cookies } from 'next/dist/client/components/headers'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const PageNotFound = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['login'])
	const router = useRouter()

	useEffect(() => {
		setTimeout(() => {
			const login = cookies.login
			if (login) {
				router.push(`/profile/${cookies.login}`)
			} else {
				router.push('/login')
			}
		}, 2000)
	}, [])

	return (
		<div className="global-wrap">
			<div className="error-content">
				<div className='error-code'>
					404
				</div>
				<div className="error-divider">
					|
				</div>
				<div className="error-message">
					Страница не найдена.
				</div>
			</div>
		</div>
	)
}

export default PageNotFound