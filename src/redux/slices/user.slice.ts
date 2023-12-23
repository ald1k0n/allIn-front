import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models';

interface InitialState {
	accessToken: string | null;
	refreshToken: string | null;
	user: IUser | null;
}

const initialState: InitialState = {
	accessToken: JSON.parse(localStorage.getItem('accessToken')!) || null,
	refreshToken: JSON.parse(localStorage.getItem('refreshToken')!) || null,
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
			localStorage.setItem('accessToken', JSON.stringify(action.payload));
		},
		setRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
			localStorage.setItem('refreshToken', JSON.stringify(action.payload));
		},
		logout: (state) => {
			localStorage.clear();
			state.accessToken = null;
			state.refreshToken = null;
		},
	},
});

export default userSlice.reducer;
export const { logout, setAccessToken, setRefreshToken } = userSlice.actions;
