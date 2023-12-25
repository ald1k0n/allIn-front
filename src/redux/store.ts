import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/user.slice';
import interactionSlice from './slices/interaction.slice';

import { chatTypeApi } from './services/chat.service';

const rootReducers = combineReducers({
	user: userSlice,
	interaction: interactionSlice,
	[chatTypeApi.reducerPath]: chatTypeApi.reducer,
});

export const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(chatTypeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
