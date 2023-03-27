import { apiSlice } from "./apiSlice";

export const ofertApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["oferts"],

  endpoints: (builder) => ({
    getOferts: builder.query({
      query: () => "/oferts",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["oferts"],
    }),

    getOfert: builder.query({
      query: (id) => `/oferts/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["oferts"],
    }),
    getOfertByProductId: builder.query({
      query: (id) => `/oferts/product/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["oferts"],
    }),

    postOfert: builder.mutation({
      query: (items) => ({
        url: "/oferts",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["oferts"],
      extraOptions: { maxRetries: 0 },
    }),

    putOfert: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/oferts/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["oferts"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteOfert: builder.mutation({
      query: (id) => ({
        url: `/oferts/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["oferts"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetOfertsQuery,
  useGetOfertQuery,
  useGetOfertByProductIdQuery,
  usePostOfertMutation,
  usePutOfertMutation,
  useDeleteOfertMutation,
} = ofertApi;
