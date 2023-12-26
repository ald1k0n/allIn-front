import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/user.slice';
import interactionSlice from './slices/interaction.slice';

import { chatTypeApi } from './services/chatType.service';
import { chatApi } from './services/chats.service.ts';
import { commentApi } from './services/comments.service.ts';
import { likeApi } from './services/likes.service.ts';

const rootReducers = combineReducers({
	user: userSlice,
	interaction: interactionSlice,
	[chatTypeApi.reducerPath]: chatTypeApi.reducer,
	[chatApi.reducerPath]: chatApi.reducer,
	[commentApi.reducerPath]: commentApi.reducer,
	[likeApi.reducerPath]: likeApi.reducer,
});

export const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			chatTypeApi.middleware,
			chatApi.middleware,
			commentApi.middleware,
			likeApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
