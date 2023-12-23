import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import interactionSlice from './slices/interaction.slice';

const rootReducers = combineReducers({
	user: userSlice,
	interaction: interactionSlice,
});

export const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
