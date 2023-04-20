import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import leaderboardSlice from '../features/leaderboard/leaderboardSlice';
import videosSlice from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [videosSlice.name]: videosSlice.reducer,
    [leaderboardSlice.name]: leaderboardSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});
