import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/user.slice';
import interactionSlice from './slices/interaction.slice';

import {
	chatApi,
	chatTypeApi,
	commentApi,
	likeApi,
	userApi,
	categoryApi,
	profileApi,
	myChatApi,
} from './services';

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
