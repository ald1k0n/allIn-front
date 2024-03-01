import { IUser } from '@/models';
import { baseQueryReAuth } from '@/redux/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

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
				console.log(body.get('id'));
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

		createUser: builder.mutation<undefined, any>({
			query: (body) => ({
				url: '/admin/users',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users'],
		}),

		sendCode: builder.mutation<undefined, { phone: string }>({
			query: (body) => ({
				url: '/auth/send-code',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useUpdateUsersMutation,
	useDeleteUserMutation,
	useCreateUserMutation,
	useSendCodeMutation,
} = userApi;
