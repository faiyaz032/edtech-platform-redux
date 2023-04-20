import apiSlice from '../api/apiSlice';

const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAssignments: builder.query({
      query: () => ({
        url: '/assignments',
      }),
    }),

    getAssignment: builder.query({
      query: id => ({
        url: `/assignments/${id}`,
      }),
    }),

    getAssignmentByVideoId: builder.query({
      query: videoId => ({
        url: `/assignments?video_id=${videoId}`,
      }),
    }),

    createAssignment: builder.mutation({
      query: data => ({
        url: '/assignments',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getAssignments', undefined, draft => {
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

    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getAssignments', undefined, draft => {
            const index = draft.findIndex(assignment => Number(assignment.id) === Number(id));
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

    deleteAssignment: builder.mutation({
      query: id => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getAssignments', undefined, draft => {
            const index = draft.findIndex(assignment => Number(assignment.id) === Number(id));
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
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentByVideoIdQuery,
} = assignmentsApi;
