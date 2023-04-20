import apiSlice from '../api/apiSlice';
import { loadQuizMarks } from '../leaderboard/leaderboardSlice';

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getQuizMarks: builder.query({
      query: () => ({
        url: '/quizMark',
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const res = await queryFulfilled;
          dispatch(loadQuizMarks(res?.data));
        } catch (error) {}
      },
      providesTags: ['getQuizMarks'],
    }),

    createQuizMark: builder.mutation({
      query: data => ({
        url: `/quizMark`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['quizMark', 'getQuizMarks'],
    }),

    quizMarkExists: builder.query({
      query: ({ studentId, videoId }) => ({
        url: `/quizMark?student_id=${studentId}&&video_id=${videoId}`,
      }),

      providesTags: ['quizMark'],
    }),
  }),
});

export const { useCreateQuizMarkMutation, useQuizMarkExistsQuery, useGetQuizMarksQuery } =
  quizMarkApi;
