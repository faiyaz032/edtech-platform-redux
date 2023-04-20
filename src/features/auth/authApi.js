import apiSlice from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          //extract the data from the response
          const { data } = (await queryFulfilled) || {};
          //prepare user data
          const userData = { accessToken: data.accessToken, user: data.user };
          //set the data to local storage
          localStorage.setItem('auth', JSON.stringify(userData));
          //dispatch a action to update the local state
          dispatch(userLoggedIn(userData));
        } catch (error) {}
      },
      invalidatesTags: ['getUsers'],
    }),

    login: builder.mutation({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          //extract the data from the response
          const { data } = (await queryFulfilled) || {};
          //prepare user data
          const userData = { accessToken: data.accessToken, user: data.user };
          //set the data to local storage
          localStorage.setItem('auth', JSON.stringify(userData));
          //dispatch a action to update the local state
          dispatch(userLoggedIn(userData));
        } catch (error) {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
