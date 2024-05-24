import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILikeModel } from '@/models/users_reaction/like.model.ts';
import { baseURL } from '@/configs';
import { RootState } from '@/redux/store';

export const likeApi = createApi({
	reducerPath: 'like',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),
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
