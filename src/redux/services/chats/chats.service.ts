import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '@/redux/baseQuery.ts';
import { IChatModel } from '@/models/chats/chat.model.ts';

export const chatApi = createApi({
	reducerPath: 'chat',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Chats', 'Saved', 'Subscribed'],
	endpoints: (builder) => ({
		getChats: builder.query<{ data: IChatModel[] }, void>({
			query: () => ({
				url: '/admin/chats',
			}),
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }) => ({ type: 'Chats' as const, id })),
							{ type: 'Chats', id: 'LIST' },
					  ]
					: [{ type: 'Chats', id: 'LIST' }],
		}),

		getSavedChats: builder.query<{ chats: IChatModel[] }, number>({
			query: (id) => ({
				url: `/admin/users/${id}/saved`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.chats.map(({ id }) => ({ type: 'Saved' as const, id })),
							{ type: 'Saved', id: 'LIST' },
					  ]
					: [{ type: 'Saved', id: 'LIST' }],
		}),

		getSubscribedChats: builder.query<{ chats: IChatModel[] }, number>({
			query: (id) => ({
				url: `/admin/users/${id}/subscribed`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.chats.map(({ id }) => ({
								type: 'Subscribed' as const,
								id,
							})),
							{ type: 'Subscribed', id: 'LIST' },
					  ]
					: [{ type: 'Subscribed', id: 'LIST' }],
		}),

		updateChat: builder.mutation<undefined, any>({
			query: (body) => {
				return {
					url: `admin/chats/${body.get('id')}`,
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['Chats'],
		}),
		deleteChat: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `admin/chats/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Chats'],
		}),

		createChat: builder.mutation<undefined, any>({
			query: (body) => ({
				url: '/admin/chats',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Chats'],
		}),
	}),
});

export const {
	useGetChatsQuery,
	useLazyGetSavedChatsQuery,
	useLazyGetSubscribedChatsQuery,
	useUpdateChatMutation,
	useDeleteChatMutation,

	useCreateChatMutation,
} = chatApi;
