export interface IObjectInProfile {
	id: number
	decision: string
	street: string
	home?: string
}

export interface IObjectNew {
	district: string
	region: string
	address: string
	objectType: string
	objectState: string
	objectArea: number
	owner: string
	actualUser: string
	customProperties: CustomProperty[]
}

export interface CustomProperty {
	name: string
	value: string
}