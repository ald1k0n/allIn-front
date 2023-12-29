import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '../baseQuery.ts';
import { ILocationModel } from '@/models/location.model.ts';

export const locationApi = createApi({
	reducerPath: 'locationApi',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Locations'],
	endpoints: (builder) => ({
		getLocations: builder.query<{ locations: ILocationModel[] }, void>({
			query: () => ({
				url: '/locations',
			}),
			providesTags: (result) =>
				result
					? [
							...result.locations.map(({ id }) => ({
								type: 'Locations' as const,
								id,
							})),
							{ type: 'Locations', id: 'LIST' },
					  ]
					: [{ type: 'Locations', id: 'LIST' }],
		}),
	}),
});

export const { useGetLocationsQuery } = locationApi;
