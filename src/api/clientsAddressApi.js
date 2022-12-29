import { apiSlice } from "./apiSlice";

export const clientAddressApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["clients_addresses"],

  endpoints: (builder) => ({
    getClientAddresses: builder.query({
      query: () => "/clients_addresses",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["clients_addresses"],
    }),

    getClientAddress: builder.query({
      query: (id) => `/clients_addresses/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["clients_addresses"],
    }),

    postClientAddress: builder.mutation({
      query: (items) => ({
        url: "/clients_addresses",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["clients_addresses"],
      extraOptions: { maxRetries: 0 },
    }),

    putClientAddress: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/clients_addresses/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["clients_addresses"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteClientAddress: builder.mutation({
      query: (id) => ({
        url: `/clients_addresses/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["clients_addresses"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetClientAddressesQuery,
  useGetClientAddressQuery,
  usePostClientAddressMutation,
  usePutClientAddressMutation,
  useDeleteClientAddressMutation,
} = clientAddressApi;
