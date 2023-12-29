import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '@/redux/baseQuery';
import { IUser } from '@/models';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Users'],
	endpoints: (builder) => ({
		getUsers: builder.query<{ data: IUser[]; count: number }, void>({
			query: () => ({
				url: 'admin/users',
			}),
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }) => ({ type: 'Users' as const, id })),
							{ type: 'Users', id: 'LIST' },
					  ]
					: [{ type: 'Users', id: 'LIST' }],
		}),
		updateUsers: builder.mutation<undefined, IUser>({
			query: (body) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { id, ...newBody } = body;
				return {
					url: `admin/users/${body.id}`,
					method: 'PATCH',
					body: newBody,
				};
			},
			invalidatesTags: ['Users'],
		}),
	}),
});

export const { useGetUsersQuery, useUpdateUsersMutation } = userApi;
