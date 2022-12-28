import { apiSlice } from "./apiSlice";

export const clientCategoryApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["clients_categories"],

  endpoints: (builder) => ({
    getClientCategories: builder.query({
      query: () => "/clients_categories",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["clients_categories"],
    }),

    getClientCategory: builder.query({
      query: (id) => `/clients_categories/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["clients_categories"],
    }),

    postClientCategory: builder.mutation({
      query: (items) => ({
        url: "/clients_categories",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["clients_categories"],
      extraOptions: { maxRetries: 0 },
    }),

    putClientCategory: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/clients_categories/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["clients_categories"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteClientCategory: builder.mutation({
      query: (id) => ({
        url: `/clients_categories/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["clients_categories"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetClientCategoriesQuery,
  useGetClientCategoryQuery,
  usePostClientCategoryMutation,
  usePutClientCategoryMutation,
  useDeleteClientCategoryMutation,
} = clientCategoryApi;
