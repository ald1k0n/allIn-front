import { IComplaintModel } from '@/models/complaint.model.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '@/configs';
import { RootState } from '../store';

export const complaintApi = createApi({
	reducerPath: 'complaints',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set('Authorization', `Bearer ${acceess_token}`);
		},
	}),

	tagTypes: ['Complaints'],
	endpoints: (builder) => ({
		getComplaints: builder.query<{ complaints: IComplaintModel[] }, void>({
			query: () => ({
				url: '/complaints',
			}),
			providesTags: (result) =>
				result
					? [
							...result.complaints.map(({ id }) => ({
								type: 'Complaints' as const,
								id,
							})),
							{ type: 'Complaints', id: 'LIST' },
					  ]
					: [{ type: 'Complaints', id: 'LIST' }],
		}),

		deleteComplaint: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `/complaints/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Complaints'],
		}),

		createComplaint: builder.mutation<undefined, any>({
			query: (body) => ({
				url: '/complaints',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Complaints'],
		}),
	}),
});

export const {
	useGetComplaintsQuery,
	useDeleteComplaintMutation,
	useCreateComplaintMutation,
} = complaintApi;
