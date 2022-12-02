/* eslint-disable prettier/prettier */
import { apiSlice } from "./apiSlice";

export const productsLotsApi = apiSlice.injectEndpoints({
  
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["product_lot"],
  
  endpoints: (builder) => ({
    
    getProductsLots: builder.query({
      query: () => "/product_lot",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["product_lot"],
    }),

    getProductsLot: builder.query({
      query: (id) => `/product_lot/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["product_lot"],
    }),

    postProductsLot: builder.mutation({
      query: (newProductsLots) => ({
        url: "/product_lot",
        method: "post",
        body: newProductsLots,
      }),
      invalidatesTags: ["product_lot"],
      extraOptions: { maxRetries: 0 },
    }),

    putProductsLot: builder.mutation({
      query: ({ id, ...editProductsLots }) => ({
        url: `/product_lot/${id}`,
        method: "put",
        body: editProductsLots,
      }),
      invalidatesTags: ["product_lot"],
      extraOptions: { maxRetries: 0 },
    }),
    
    deleteProductsLot: builder.mutation({
      query: (id) => ({
        url: `/product_lot/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["product_lot"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { 
  useGetProductsLotsQuery, 
  useGetProductsLotQuery, 
  usePostProductsLotMutation, 
  usePutProductsLotMutation, 
  useDeleteProductsLotMutation, 
} = productsLotsApi;
