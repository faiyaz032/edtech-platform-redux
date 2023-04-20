import apiSlice from '../api/apiSlice';
import { loadVideos } from './videosSlice';

const videosApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getVideos: builder.query({
      query: () => ({
        url: '/videos',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(loadVideos(data));
        } catch (error) {}
      },
    }),

    getVideo: builder.query({
      query: id => ({
        url: `/videos/${id}`,
      }),
    }),

    createVideo: builder.mutation({
      query: data => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, draft => {
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

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, draft => {
            const index = draft.findIndex(video => Number(video.id) === Number(id));
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

    deleteVideo: builder.mutation({
      query: id => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { queryFulfilled, dispatch }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, draft => {
            const index = draft.findIndex(video => Number(video.id) === Number(id));
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
  useGetVideosQuery,
  useGetVideoQuery,
  useCreateVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
