import MainLayout from '@/components/MainLayout'
import React, { useState } from 'react'
import { IPropertyNew, CustomAttribute } from '@/types/property'
import Image from 'next/image'
import API from '@/utils/API'

const CreateObject = () => {
	const [district, setDistrict] = useState('')//округ
	const [region, setRegion] = useState('')//район
	const [street, setStreet] = useState('')//улица
	const [home, setHome] = useState('')//дом
	const [objectType, setObjectType] = useState('')//тип объекта
	const [objectState, setObjectState] = useState('')//остояние объекта
	const [objectArea, setObjectArea] = useState('')//площадь объекта
	const [owner, setOwner] = useState('')//собственник
	const [actualUser, setActualUser] = useState('')//факт. пользователь
	const [description, setDescription] = useState('')//описание объекта
	const [files, setFiles] = useState<FileList | null>(null)//файлы

	const [validateError, setValidateError] = useState<string | null>(null)

	const [customAttributes, setCustomAttributes] = useState<CustomAttribute[]>([])

	const [newAttributeName, setNewAttributeName] = useState('')
	const [newAttributeValue, setNewAttributeValue] = useState('')

	function validateAll() {
		return district.length && region.length && street.length && home.length && objectType.length && objectState.length && objectArea.length && owner.length && actualUser.length && description.length
	}
	function validateNew() {
		return newAttributeName.length && newAttributeValue.length
	}

	function handleAddAttribute(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!validateNew()) {
			setValidateError('Заполните имя и значение нового атрибута')
			return
		}
		setValidateError('')

		//добавляем поле
		setCustomAttributes([...customAttributes, {
			name: newAttributeName,
			value: newAttributeValue
		}])

		setNewAttributeName('')
		setNewAttributeValue('')
	}

	function handleCreateObject(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!validateAll()) {
			setValidateError('Заполните все поля')
			return
		}

		API.post('/property/create', {
			district,
			region,
			street,
			home,
			objectType,
			objectState,
			objectArea,
			owner,
			actualUser,
			description,
			files
		})
	}

	function handleDeleteAttribute(e: React.MouseEvent<HTMLImageElement>) {
		const target: HTMLImageElement = e.currentTarget
		const dataset: DOMStringMap = target.dataset
		
		const name = dataset.name
		setCustomAttributes(customAttributes.filter(attr => attr.name !== name))
	}

	return (
		<MainLayout>
			<div className="container">
				<h1>Создание объекта</h1>
				<div className="object-table">
					<div className="col-1">
						<input type='text' placeholder='Округ' value={district} onChange={e => setDistrict(e.target.value)}/>
						<input type='text' placeholder='Район' value={region} onChange={e => setRegion(e.target.value)}/>
						<div className='address-inputs'>
							<input type='text' placeholder='Улица' value={street} onChange={e => setStreet(e.target.value)}/>
							<input type='text' placeholder='Дом' value={home} onChange={e => setHome(e.target.value)}/>
						</div>
						<input type='text' placeholder='Тип объекта' value={objectType} onChange={e => setObjectType(e.target.value)}/>
						<input type='text' placeholder='Состояние объекта' value={objectState} onChange={e => setObjectState(e.target.value)}/>
						<input type='number' placeholder='Площадь объекта' value={objectArea} onChange={e => setObjectArea(e.target.value)}/>
						<input type='text' placeholder='Собственник' value={owner} onChange={e => setOwner(e.target.value)}/>
						<input type='text' placeholder='Факт. пользователь' value={actualUser} onChange={e => setActualUser(e.target.value)}/>
						{
							customAttributes.map((attr) => {
								return (
									<div className='new-attribute-box'>
										<Image data-name={attr.name} onClick={(e) => handleDeleteAttribute(e)} src='/assets/icons/delete-icon.png' alt='delete-custom-attr' width={30} height={30}/>
										<input className='new-attribute-object' type='text' placeholder={attr.value} disabled/>
									</div>
								)
							})
						}
						<form className='create-attribute-form' onSubmit={e => handleAddAttribute(e)}>
							<div className="create-attribute-form-inputs">
								<input type='text' className='property-new-attr-input' value={newAttributeName} onChange={e => setNewAttributeName(e.target.value)}/>
								<input type='text' className='property-new-attr-input' value={newAttributeValue} onChange={e => setNewAttributeValue(e.target.value)}/>
							</div>
							<button type='submit' className='add-attribute-btn'>+ Добавить поле</button>
							{
								validateError && <span>{validateError}</span>
							}
						</form>
					</div>
					<div className="col-2">
						<textarea className='description-input' placeholder='Описание' value={description} onChange={e => setDescription(e.target.value)}/>
						<input type='file' accept='image/*,video/*' multiple onChange={(e) => {
							setFiles(e.currentTarget.files)
						}}/>
						<p className='files-view'>Выбрано {files ? files.length : 0} файлов</p>
						<button type='submit' onClick={() => handleCreateObject} className='create-object-submit-btn'>Создать объект</button>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default CreateObject