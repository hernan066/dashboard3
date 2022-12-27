import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["categories"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["categories"],
    }),

    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["categories"],
    }),

    postCategory: builder.mutation({
      query: (items) => ({
        url: "/categories",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["categories"],
      extraOptions: { maxRetries: 0 },
    }),

    putCategory: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/categories/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["categories"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["categories"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  usePostCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
