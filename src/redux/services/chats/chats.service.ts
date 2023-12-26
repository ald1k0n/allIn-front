import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '../../baseQuery.ts';
import { IChatModel } from '../../../models/chats/chat.model.ts';

export const chatApi = createApi({
	reducerPath: 'chat',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Chats'],
	endpoints: (builder) => ({
		getChats: builder.query<IChatModel[], void>({
			query: () => ({
				url: '/chats',
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Chats' as const, id })),
							{ type: 'Chats', id: 'LIST' },
					  ]
					: [{ type: 'Chats', id: 'LIST' }],
		}),
	}),
});

export const { useGetChatsQuery } = chatApi;
