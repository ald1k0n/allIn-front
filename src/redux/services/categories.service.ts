import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from '../baseQuery.ts';
import { ICategoryModel } from '../../models/category.model.ts';

export const categoryApi = createApi({
	reducerPath: 'categories',
	baseQuery: baseQueryReAuth,
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
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
