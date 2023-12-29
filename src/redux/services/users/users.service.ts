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
		updateUsers: builder.mutation<undefined, any>({
			query: (body) => {
				return {
					url: `admin/users/${body.get('id')}`,
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['Users'],
		}),
		deleteUser: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `admin/users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useUpdateUsersMutation,
	useDeleteUserMutation,
} = userApi;
