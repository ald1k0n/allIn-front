import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { baseURL } from '@/configs';

import { logout, setAccessToken } from './slices/user.slice.ts';

const baseQuery = fetchBaseQuery({
	baseUrl: baseURL,
	prepareHeaders: (header) => {
		const access_token = JSON.parse(localStorage.getItem('accessToken')!);
		if (access_token) {
			header.set('authorization', `Bearer ${access_token}`);
		}
		return header;
	},
});

export const baseQueryReAuth = async (
	args: any,
	api: any,
	extraOptions: any
) => {
	let result = await baseQuery(args, api, extraOptions as NonNullable<unknown>);

	if (result?.error?.status === 400) {
		console.log('sending refresh');
		const refreshResult = await fetch(`${baseURL}/auth/refresh`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('refreshToken')!}`,
			},
		})
			.then((res) => res.json())
			.catch(() => api.dispatch(logout()));

		if (refreshResult) {
			api.dispatch(setAccessToken(refreshResult.accessToken));

			result = await baseQuery(args, api, extraOptions as NonNullable<unknown>);
		} else {
			api.dispatch(logout());
		}
	}
	return result;
};
