import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '../baseQuery.ts';
import { ICommentModel } from '../../models/comment.model.ts';

export const commentApi = createApi({
	reducerPath: 'comment',
	baseQuery: baseQueryReAuth,
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
