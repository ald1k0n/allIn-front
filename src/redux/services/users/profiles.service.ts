import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '@/redux/baseQuery.ts';
import { IProfileModel } from '@/models/users/profile.model.ts';

export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: baseQueryReAuth,
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
