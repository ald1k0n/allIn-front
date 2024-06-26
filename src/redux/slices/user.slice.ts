import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, ILogin } from '@/models';
import { baseURL } from '@/configs';
import axios from 'axios';

interface InitialState {
	accessToken: string | null;
	refreshToken: string | null;
	user: IUser | null;
	isLoading: boolean;
	isError: any;
}

const initialState: InitialState = {
	accessToken: localStorage.getItem('accessToken') || null,
	refreshToken: localStorage.getItem('refreshToken') || null,
	user: null,
	isLoading: false,
	isError: null,
};

axios.interceptors.request.use(
	(response: any) => {
		if (response.status !== 400) {
			return response;
		}

		return refresh().then(() => {
			return axios(response.config);
		});
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const login = createAsyncThunk('userApi/login', async (body: ILogin) => {
	// console.log(body, 'body in thunk');
	const { data: response } = await axios.post(
		`${baseURL}/auth/check-code`,
		body,
		{ withCredentials: true }
	);
	return response;
});

const refresh = async () => {
	const { data } = await axios.get(`${baseURL}/auth/refresh`, {
		headers: {
			authorization: `Bearer ${localStorage
				.getItem('refreshToken')!
				.replaceAll('"', '')}`,
		},
		withCredentials: true,
	});
	return data;
};

export const getMe = createAsyncThunk('userApi/getMe', async () => {
	const { data } = await axios.get(`${baseURL}/users/account`, {
		headers: {
			authorization: `Bearer ${localStorage
				.getItem('accessToken')!
				.replaceAll('"', '')}`,
		},
		withCredentials: true,
	});

	return data;
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
			localStorage.setItem('accessToken', action.payload);
		},
		setRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
			localStorage.setItem('refreshToken', action.payload);
		},
		logout: (state) => {
			localStorage.clear();
			state.accessToken = null;
			state.refreshToken = null;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.rejected, (state) => {
			state.isLoading = false;
			state.isError = 'Произошла ошибка на стороне сервера';
		});
		builder.addCase(login.fulfilled, (state, action) => {
			// console.log(action);
			state.accessToken = action.payload?.accessToken;
			state.refreshToken = action.payload?.refreshToken;
			localStorage.setItem(
				'accessToken',
				JSON.stringify(action.payload?.accessToken)
			);
			localStorage.setItem(
				'refreshToken',
				JSON.stringify(action.payload?.refreshToken)
			);
			state.user = action.payload?.user;
		});

		// getME
		builder.addCase(getMe.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getMe.rejected, (state) => {
			state.isLoading = false;
			state.isError = 'Произошла ошибка на стороне сервера';
			state.user = null;
		});
		builder.addCase(getMe.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload?.user;
		});
	},
});

export default userSlice.reducer;
export const { logout, setAccessToken, setRefreshToken } = userSlice.actions;
