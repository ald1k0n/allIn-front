import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProfileModel } from '@/models/users/profile.model.ts';
import { baseURL } from '@/configs';
import { RootState } from '@/redux/store';

export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),
	tagTypes: ['Profiles'],
	endpoints: (builder) => ({
		getProfiles: builder.query<{ profiles: IProfileModel[] }, number>({
			query: (id) => ({
				url: `/users/${id}/profile`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.profiles.map(({ id }) => ({
								type: 'Profiles' as const,
								id,
							})),
							{ type: 'Profiles', id: 'LIST' },
					  ]
					: [{ type: 'Profiles', id: 'LIST' }],
		}),
	}),
});

export const { useGetProfilesQuery } = profileApi;
