import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/user.slice';
import interactionSlice from './slices/interaction.slice';

import { chatTypeApi } from './services/chats/chatType.service.ts';
import { chatApi } from './services/chats/chats.service.ts';
import { commentApi } from './services/users_reaction/comments.service.ts';
import { likeApi } from './services/users_reaction/likes.service.ts';
import { userApi } from './services/users/users.service.ts';
import { categoryApi } from './services/categories.service.ts';
import { profileApi } from './services/users/profiles.service.ts';
import { myChatApi } from './services/chats/myChats.service.ts';

const serviceReducers = {
	[chatTypeApi.reducerPath]: chatTypeApi.reducer,
	[chatApi.reducerPath]: chatApi.reducer,
	[commentApi.reducerPath]: commentApi.reducer,
	[likeApi.reducerPath]: likeApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[categoryApi.reducerPath]: categoryApi.reducer,
	[profileApi.reducerPath]: profileApi.reducer,
	[myChatApi.reducerPath]: myChatApi.reducer,
};

const serviceMiddlewares = [
	chatTypeApi.middleware,
	chatApi.middleware,
	commentApi.middleware,
	likeApi.middleware,
	categoryApi.middleware,
	profileApi.middleware,
	myChatApi.middleware,
	userApi.middleware,
];

const rootReducers = combineReducers({
	user: userSlice,
	interaction: interactionSlice,
	...serviceReducers,
});

export const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(...serviceMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
