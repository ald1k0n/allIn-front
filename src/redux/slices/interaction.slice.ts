import { createSlice } from '@reduxjs/toolkit';

interface init {
	isOpen: boolean;
	userProfileName?: string;
}

const initialState: init = {
	isOpen: false,
	userProfileName: undefined,
};

const interactionSlice = createSlice({
	name: 'interaction',
	initialState,
	reducers: {
		toggleOpen: (state) => {
			state.isOpen = !state.isOpen;
		},
		setUserProfile: (state, action) => {
			state.userProfileName = action.payload;
		},
	},
});

export default interactionSlice.reducer;
export const { toggleOpen, setUserProfile } = interactionSlice.actions;
