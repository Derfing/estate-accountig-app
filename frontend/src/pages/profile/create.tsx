import MainLayout from '@/components/MainLayout'
import { useAppDispatch } from '@/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Create = () => {
	const router = useRouter()
	const [login, setLogin] = useState('')
	const dispatch = useAppDispatch()

	useEffect(() => {
		
	}, [])

	function handeInputLogin(e: React.ChangeEvent<HTMLInputElement>) {
		setLogin(e.target.value)
	}

	return (
		<MainLayout>
			<div className="container">
				<h1>Добавить сотрудника</h1>
				<section>
					<label>Логин: </label>
					<input type='text' value={login} onChange={handeInputLogin}/>
				</section>
			</div>
		</MainLayout>
	)
}

export default Create