import { ISubChatModel } from '@/models/chats/subchat.model';
import { baseQueryReAuth } from '@/redux/baseQuery.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const subchatApi = createApi({
	reducerPath: 'subchat',
	baseQuery: baseQueryReAuth,
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

		updateSubchat: builder.mutation<undefined, { id: number; title: string }>({
			query: ({ id, title }) => ({
				url: `/subchats/${id}`,
				method: 'PATCH',
				body: {
					title,
				},
			}),
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
