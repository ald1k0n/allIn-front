import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '../baseQuery.ts';
import { IUser } from '../../models';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Users'],
	endpoints: (builder) => ({
		getUsers: builder.query<IUser[], void>({
			query: () => ({
				url: 'admin/users',
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Users' as const, id })),
							{ type: 'Users', id: 'LIST' },
					  ]
					: [{ type: 'Users', id: 'LIST' }],
		}),
	}),
});

export const { useGetUsersQuery } = userApi;
