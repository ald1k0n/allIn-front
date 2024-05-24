import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IChatTypeModel } from '@/models/chats/chat-type.model.ts';
import { baseURL } from '@/configs';
import { RootState } from '@/redux/store';

export const chatTypeApi = createApi({
	reducerPath: 'chatType',
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
