import { apiSlice } from "./apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["clients"],

  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/clients",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["clients"],
    }),

    getClient: builder.query({
      query: (id) => `/clients/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["clients"],
    }),

    postClient: builder.mutation({
      query: (items) => ({
        url: "/clients",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["clients"],
      extraOptions: { maxRetries: 0 },
    }),

    putClient: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/clients/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["clients"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["clients"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  usePostClientMutation,
  usePutClientMutation,
  useDeleteClientMutation,
} = clientApi;
