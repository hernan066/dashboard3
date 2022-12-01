import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login2",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.query({
      query: () => "/auth/refresh",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
    }),
  }),
});

export const { useLoginMutation, useRefreshQuery } = authApi;
