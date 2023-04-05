import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 1, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["products"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["products"],
    }),

    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["products"],
    }),
    getProductOfert: builder.query({
      query: (id) => `/products/ofert/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["products"],
    }),

    postProduct: builder.mutation({
      query: (items) => ({
        url: "/products",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["products", "reports"],
      extraOptions: { maxRetries: 0 },
    }),

    putProduct: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/products/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["products", "reports"],
      extraOptions: { maxRetries: 0 },
    }),
    putProductStock: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/products/updateStock1/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["products", "reports"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["products", "reports"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductOfertQuery,
  usePostProductMutation,
  usePutProductMutation,
  usePutProductStockMutation,
  useDeleteProductMutation,
} = productApi;
