import MainLayout from '@/components/MainLayout'
import { CustomAttribute } from '@/types/property'
import API from '@/utils/API'
import { GetServerSideProps } from 'next/types'
import React from 'react'

interface ServerSideProps {
	status: string
	result: {
		propertyId: number
		district: string
		region: string
		street: string
		home: string
		propertyType: string
		propertyState: string
		propertyArea: number
		owner: string
		actualUser: string
		customAttributes: CustomAttribute[]
	}
}

const Property = () => {
	return (
		<MainLayout>
			<div className="container">
				<div className="object-wrap">
					<div className="col col-1"></div>
					<div className="col col-2"></div>
					<div className="col col-3">

					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{ data: ServerSideProps }> = async (context) => {
	const id = context.query['id']
	const data: ServerSideProps = await API.get(`/property/${id}`).then(response => response.data)

	return {
		props: {
			data
		}
	}
}

export default Property