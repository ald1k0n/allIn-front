import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '@/redux/baseQuery.ts';
import { IChatModel } from '@/models/chats/chat.model.ts';

export const chatApi = createApi({
	reducerPath: 'chat',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Chats'],
	endpoints: (builder) => ({
		getChats: builder.query<{ chats: IChatModel[] }, void>({
			query: () => ({
				url: '/chats',
			}),
			providesTags: (result) =>
				result
					? [
							...result.chats.map(({ id }) => ({ type: 'Chats' as const, id })),
							{ type: 'Chats', id: 'LIST' },
					  ]
					: [{ type: 'Chats', id: 'LIST' }],
		}),
	}),
});

export const { useGetChatsQuery } = chatApi;
