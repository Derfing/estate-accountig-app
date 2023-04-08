import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PageNotFound = () => {
	const router = useRouter()

	useEffect(() => {
		setTimeout(() => {
			router.push('/')
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