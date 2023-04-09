import MainLayout from '@/components/MainLayout'
import React, { useState } from 'react'
import { IObjectNew, CustomProperty } from '@/types/object'

const CreateObject = () => {
	const [district, setDistrict] = useState('')//округ
	const [region, setRegion] = useState('')//район
	const [address, setAddress] = useState('')//адрес
	const [objectType, setObjectType] = useState('')//тип объекта
	const [objectState, setObjectState] = useState('')//остояние объекта
	const [objectArea, setObjectArea] = useState('')//площадь объекта
	const [owner, setOwner] = useState('')//собственник
	const [actualUser, setActualUser] = useState('')//факт. пользователь

	const customProperties: CustomProperty[] = []
	const [newPropertyName, setNewPropertyName] = useState('')
	const [newPropertyValue, setNewPropertyValue] = useState('')

	return (
		<MainLayout>
			<div className="container">
				<h1>Создание объекта</h1>
				<div className="object-table">
					<div className="col-1">
						<input type='text' placeholder='Округ' value={district} onChange={e => setDistrict(e.target.value)}/>
						<input type='text' placeholder='Район' value={region} onChange={e => setRegion(e.target.value)}/>
						<input type='text' placeholder='Адрес' value={address} onChange={e => setAddress(e.target.value)}/>
						<input type='text' placeholder='Тип объекта' value={objectType} onChange={e => setObjectType(e.target.value)}/>
						<input type='text' placeholder='Состояние объекта' value={objectState} onChange={e => setObjectState(e.target.value)}/>
						<input type='number' placeholder='Площадь объекта' value={objectArea} onChange={e => setObjectArea(e.target.value)}/>
						<input type='text' placeholder='Собственник' value={owner} onChange={e => setOwner(e.target.value)}/>
						<input type='text' placeholder='Факт. пользователь' value={actualUser} onChange={e => setActualUser(e.target.value)}/>
						<form>
							<input type='text' value={newPropertyName} onChange={e => setNewPropertyName(e.target.value)}/>
							<input type='text' value={newPropertyValue} onChange={e => setNewPropertyValue(e.target.value)}/>
						</form>
					</div>
					<div className="col-2">

					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default CreateObject