import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        const token = getState()?.auth?.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      } catch (error) {
        console.log(error);
      }
    },
  }),
  tagTypes: ['quizMark', 'assignmentMarkExists', 'getAssignmentsMarks', 'getQuizMarks', 'getUsers'],
  //endpoints will be injected from specific features
  endpoints: builder => ({}),
});

export default apiSlice;
