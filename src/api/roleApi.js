import { apiSlice } from "./apiSlice";

export const roleApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["roles"],

  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/roles",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["roles"],
    }),

    getRole: builder.query({
      query: (id) => `/roles/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["roles"],
    }),

    postRole: builder.mutation({
      query: (newRoles) => ({
        url: "/roles",
        method: "post",
        body: newRoles,
      }),
      invalidatesTags: ["roles"],
      extraOptions: { maxRetries: 0 },
    }),

    putRole: builder.mutation({
      query: ({ id, ...editRoles }) => ({
        url: `/roles/${id}`,
        method: "put",
        body: editRoles,
      }),
      invalidatesTags: ["roles"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["roles"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  usePostRoleMutation,
  usePutRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
