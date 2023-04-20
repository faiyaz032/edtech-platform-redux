import apiSlice from '../api/apiSlice';
import { loadAssignmentMarks } from '../leaderboard/leaderboardSlice';

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAssignmentsMarks: builder.query({
      query: () => ({
        url: '/assignmentMark',
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const res = await queryFulfilled;
          dispatch(loadAssignmentMarks(res?.data));
        } catch (error) {}
      },
      providesTags: ['getAssignmentsMarks'],
    }),

    createAssignmentMark: builder.mutation({
      query: data => ({
        url: '/assignmentMark',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['assignmentMarkExists', 'getAssignmentsMarks'],
    }),

    assignmentMarkExists: builder.query({
      query: ({ assignmentId, studentId }) =>
        `assignmentMark?assignment_id=${assignmentId}&&student_id=${studentId}`,
      providesTags: ['assignmentMarkExists'],
    }),

    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: `PATCH`,
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getAssignmentsMarks', undefined, draft => {
            const index = draft.findIndex(
              assignmentMark => Number(assignmentMark.id) === Number(id)
            );
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
  }),
});

export default assignmentMarkApi;
export const {
  useCreateAssignmentMarkMutation,
  assignmentMarkExists,
  useGetAssignmentsMarksQuery,
  useEditAssignmentMarkMutation,
} = assignmentMarkApi;
