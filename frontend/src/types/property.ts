export interface IPropertyInProfile {
	id: number
	decision: string
	street: string
	home?: string
}

export interface IPropertyNew {
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

export interface CustomAttribute {
	name: string
	value: string
}