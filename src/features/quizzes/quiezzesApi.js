import apiSlice from '../api/apiSlice';

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getQuizzes: builder.query({
      query: () => ({
        url: '/quizzes',
      }),
    }),

    getQuizzesByVideoId: builder.query({
      query: id => ({
        url: `/quizzes?video_id=${id}`,
      }),
    }),

    getQuiz: builder.query({
      query: id => ({
        url: `/quizzes/${id}`,
      }),
    }),

    createQuiz: builder.mutation({
      query: data => ({
        url: '/quizzes',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getQuizzes', undefined, draft => {
            draft.push(arg);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getQuizzes', undefined, draft => {
            const index = draft.findIndex(quiz => Number(quiz.id) === Number(id));
            draft[index] = { ...data };
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    deleteQuiz: builder.mutation({
      query: id => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getQuizzes', undefined, draft => {
            const index = draft.findIndex(quiz => Number(quiz.id) === Number(id));
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetQuizzesQuery,
  useEditQuizMutation,
  useGetQuizQuery,
  useDeleteQuizMutation,
  useGetQuizzesByVideoIdQuery,
} = quizzesApi;
