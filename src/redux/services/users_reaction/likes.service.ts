import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '../../baseQuery.ts';
import { ILikeModel } from '../../../models/users_reaction/like.model.ts';

export const likeApi = createApi({
	reducerPath: 'like',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Likes'],
	endpoints: (builder) => ({
		getLikes: builder.query<ILikeModel[], void>({
			query: (profile_id) => ({
				url: `/users/profile/${profile_id}/likes`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ user_id }) => ({
								type: 'Likes' as const,
								user_id,
							})),
							{ type: 'Likes', id: 'LIST' },
					  ]
					: [{ type: 'Likes', id: 'LIST' }],
		}),
	}),
});

export const { useGetLikesQuery } = likeApi;
