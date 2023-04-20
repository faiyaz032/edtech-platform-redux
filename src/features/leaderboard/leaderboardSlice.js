import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  quizMarks: [],
  assignmentMarks: [],
  leaderboardMarks: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    loadUsers(state, action) {
      state.users = action.payload;
    },
    loadQuizMarks(state, action) {
      state.quizMarks = action.payload;
    },
    loadAssignmentMarks(state, action) {
      state.assignmentMarks = action.payload;
    },
    updateLeaderboard(state, action) {
      state.leaderboardMarks = [...action.payload];
    },
  },
});

export default leaderboardSlice;
export const { loadUsers, loadQuizMarks, loadAssignmentMarks, updateLeaderboard } =
  leaderboardSlice.actions;
