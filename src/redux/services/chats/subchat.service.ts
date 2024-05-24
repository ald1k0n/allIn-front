import { baseURL } from '@/configs';
import { ISubChatModel } from '@/models/chats/subchat.model';
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subchatApi = createApi({
	reducerPath: 'subchat',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),
	tagTypes: ['SubChats'],
	endpoints: (builder) => ({
		getSubchatByChatId: builder.query<{ subChats: ISubChatModel[] }, number>({
			query: (id) => ({
				url: `/chats/${id}/subchats`,
			}),
			providesTags: (result) =>
				result
					? [
							...result!.subChats.map(({ id }) => ({
								type: 'SubChats' as const,
								id,
							})),
							{ type: 'SubChats', id: 'LIST' },
					  ]
					: [{ type: 'SubChats', id: 'LIST' }],
		}),
		createSubchat: builder.mutation<undefined, ISubChatModel>({
			query: (body) => ({
				url: '/subchats',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['SubChats'],
		}),

		deleteSubchat: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `/subchats/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['SubChats'],
		}),

		updateSubchat: builder.mutation<undefined, ISubChatModel>({
			query: (payload) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { id, ...body } = payload;
				return {
					url: `/subchats/${payload.id}`,
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['SubChats'],
		}),
	}),
});

export const {
	useCreateSubchatMutation,
	useGetSubchatByChatIdQuery,
	useDeleteSubchatMutation,
	useUpdateSubchatMutation,
} = subchatApi;
