import { baseURL } from '@/configs';
import { IUser } from '@/models';
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set(
				'Authorization',
				`Bearer ${acceess_token?.replaceAll('"', '')}`
			);
		},
	}),
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
