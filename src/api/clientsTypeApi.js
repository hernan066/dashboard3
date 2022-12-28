import { apiSlice } from "./apiSlice";

export const clientTypeApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["clients_types"],

  endpoints: (builder) => ({
    getClientTypes: builder.query({
      query: () => "/clients_types",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["clients_types"],
    }),

    getClientType: builder.query({
      query: (id) => `/clients_types/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["clients_types"],
    }),

    postClientType: builder.mutation({
      query: (items) => ({
        url: "/clients_types",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["clients_types"],
      extraOptions: { maxRetries: 0 },
    }),

    putClientType: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/clients_types/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["clients_types"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteClientType: builder.mutation({
      query: (id) => ({
        url: `/clients_types/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["clients_types"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetClientTypesQuery,
  useGetClientTypeQuery,
  usePostClientTypeMutation,
  usePutClientTypeMutation,
  useDeleteClientTypeMutation,
} = clientTypeApi;
