/*import { IUser } from '@/types/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError } from 'axios';
import { isNullishCoalesce } from 'typescript';

const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
	endpoints: (builder) => ({
		login: builder.query<null, IUser>({
			query: async (arg: IUser) => {
				try {
					const response = axios.post(`${process.env.NEXT_PUBLIC_API_URI}/api/login`, {
						arg
					});
					return null
				} catch (error) {
					if (axios.isAxiosError(error)) {
						console.log('error message: ', error.message);
						return error.message;
					} else {
						console.log('unexpected error: ', error);
						return 'An unexpected error occurred';
					}
				}
			}
		})
	})
})

export default authApi*/