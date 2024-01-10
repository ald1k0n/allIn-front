import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '@/redux/baseQuery.ts';
import { IChatTypeModel } from '@/models/chats/chat-type.model.ts';

export const chatTypeApi = createApi({
	reducerPath: 'chatType',
	baseQuery: baseQueryReAuth,
	tagTypes: ['ChatType'],
	endpoints: (builder) => ({
		getChatType: builder.query<{ chatTypes: IChatTypeModel[] }, void>({
			query: () => ({
				url: '/chat-types',
			}),
			providesTags: (result) =>
				result
					? [
							...result.chatTypes.map(({ id }) => ({
								type: 'ChatType' as const,
								id,
							})),
							{ type: 'ChatType', id: 'LIST' },
					  ]
					: [{ type: 'ChatType', id: 'LIST' }],
		}),
		updateChatType: builder.mutation<undefined, any>({
			query: (body) => {
				return {
					url: `/chat-types/${body.id}`,
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['ChatType'],
		}),
		deleteChatType: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `/chat-types/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ChatType'],
		}),

		createChatType: builder.mutation<undefined, any>({
			query: (body) => ({
				url: '/chat-types',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['ChatType'],
		}),
	}),
});

export const {
	useGetChatTypeQuery,
	useCreateChatTypeMutation,
	useDeleteChatTypeMutation,
	useUpdateChatTypeMutation,
} = chatTypeApi;
