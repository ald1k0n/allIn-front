import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMyChatModel } from '@/models/chats/my-chat.model.ts';
import { ChatCategories } from '@/models/chats/chat.model.ts';
import { baseURL } from '@/configs';
import { RootState } from '@/redux/store';

export const myChatApi = createApi({
	reducerPath: 'myChat',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),
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
