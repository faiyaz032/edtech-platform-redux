import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  selectedVideoId: '',
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    loadVideos(state, action) {
      state.videos = [...action.payload];
    },
    selectVideoId(state, action) {
      state.selectedVideoId = action.payload;
    },
  },
});

export const { loadVideos, selectVideoId } = videosSlice.actions;
export default videosSlice;
