import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommentModel } from '@/models/users_reaction/comment.model.ts';
import { baseURL } from '@/configs';
import { RootState } from '@/redux/store';

export const commentApi = createApi({
	reducerPath: 'comment',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),
	tagTypes: ['Comments'],
	endpoints: (builder) => ({
		getComments: builder.query<ICommentModel[], number>({
			query: (profile_id) => ({
				url: `/users/profile/${profile_id}/comments`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Comments' as const, id })),
							{ type: 'Comments', id: 'LIST' },
					  ]
					: [{ type: 'Comments', id: 'LIST' }],
		}),
	}),
});

export const { useGetCommentsQuery } = commentApi;
