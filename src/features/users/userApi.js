import apiSlice from '../api/apiSlice';
import { loadUsers } from '../leaderboard/leaderboardSlice';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: email => ({
        url: `/users?email=${email}`,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `/users`,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const res = await queryFulfilled;
          dispatch(loadUsers(res?.data));
        } catch (error) {}
      },
      providesTags: ['getUsers'],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = usersApi;
