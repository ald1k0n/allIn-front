import { createSlice } from '@reduxjs/toolkit';

interface init {
	isOpen: boolean;
}

const initialState: init = {
	isOpen: false,
};

const interactionSlice = createSlice({
	name: 'interaction',
	initialState,
	reducers: {
		toggleOpen: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export default interactionSlice.reducer;
export const { toggleOpen } = interactionSlice.actions;
