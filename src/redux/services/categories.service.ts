import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoryModel } from '@/models/category.model.ts';
import { baseURL } from '@/configs';
import { RootState } from '../store.ts';

export const categoryApi = createApi({
	reducerPath: 'categories',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		prepareHeaders(headers, api) {
			const acceess_token = (api.getState() as RootState).user.accessToken;
			headers.set(
				'Authorization',
				`Bearer ${acceess_token?.replaceAll('"', '')}`
			);
		},
	}),
	tagTypes: ['Categories'],
	endpoints: (builder) => ({
		getCategories: builder.query<ICategoryModel[], void>({
			query: () => ({
				url: '/categories',
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Categories' as const, id })),
							{ type: 'Categories', id: 'LIST' },
					  ]
					: [{ type: 'Categories', id: 'LIST' }],
		}),
		updateCategory: builder.mutation<undefined, any>({
			query: (body) => {
				return {
					url: `/categories/${body.get('id')}`,
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['Categories'],
		}),
		deleteCategory: builder.mutation<undefined, number>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Categories'],
		}),

		createCategory: builder.mutation<undefined, any>({
			query: (body) => ({
				url: '/categories',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Categories'],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} = categoryApi;
