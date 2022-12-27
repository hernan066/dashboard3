import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["users"],
    }),

    getUser: builder.query({
      query: (id) => `/user/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["users"],
    }),

    postUser: builder.mutation({
      query: (items) => ({
        url: "/user",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["users"],
      extraOptions: { maxRetries: 0 },
    }),

    putUser: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/user/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["users"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["users"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  usePostUserMutation,
  usePutUserMutation,
  useDeleteUserMutation,
} = userApi;
