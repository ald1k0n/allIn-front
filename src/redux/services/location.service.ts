import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILocationModel } from '@/models/location.model.ts';
import { baseURL } from '@/configs/index.ts';
import { RootState } from '../store.ts';

export const locationApi = createApi({
	reducerPath: 'locationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),
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
		updateLocation: builder.mutation<ILocationModel, any>({
			query: (body) => {
				return {
					url: `/locations/${body.id}`,
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['Locations'],
		}),
		deleteLocation: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `/locations/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Locations'],
		}),

		createLocation: builder.mutation<undefined, any>({
			query: (body) => ({
				url: '/locations',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Locations'],
		}),
	}),
});

export const {
	useGetLocationsQuery,
	useCreateLocationMutation,
	useDeleteLocationMutation,
	useUpdateLocationMutation,
} = locationApi;
