import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '@/redux/baseQuery.ts';
import { IMyChatModel } from '@/models/chats/my-chat.model.ts';
import { ChatCategories } from '@/models/chats/chat.model.ts';

export const myChatApi = createApi({
	reducerPath: 'myChat',
	baseQuery: baseQueryReAuth,
	tagTypes: ['MyChats'],
	endpoints: (builder) => ({
		getMyChats: builder.query<IMyChatModel[], string>({
			query: (category) => ({
				url: `/mychats/${ChatCategories[category]}`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'MyChats' as const, id })),
							{ type: 'MyChats', id: 'LIST' },
					  ]
					: [{ type: 'MyChats', id: 'LIST' }],
		}),
	}),
});

export const { useGetMyChatsQuery } = myChatApi;
