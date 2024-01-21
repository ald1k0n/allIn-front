import {IComplaintModel} from "@/models/complaint.model.ts";
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryReAuth} from "@/redux/baseQuery.ts";


export const complaintApi = createApi({
	reducerPath: 'complaints',
	baseQuery: baseQueryReAuth,
	tagTypes: ['Complaints'],
	endpoints: (builder) => ({
		getComplaints: builder.query<{ complaints: IComplaintModel[]; }, void>({
			query: () => ({
				url: '/complaints',
			}),
			providesTags: (result) =>
				result
					? [
							...result.complaints.map(({ id }) => ({ type: 'Complaints' as const, id })),
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
    useCreateComplaintMutation
} = complaintApi;
