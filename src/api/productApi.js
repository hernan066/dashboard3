/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API_URL || "http://localhost:3040/api";

const userParse = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = userParse && JSON.parse(userParse).user;
const token = currentUser?.token;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: retry(fetchBaseQuery({ baseUrl: API, headers: { "x-token": token } }), {
    maxRetries: 2,
  }),
  keepUnusedDataFor: 60, // duracion de datos en cache

  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["Products"],
    }),
    postProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "post",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
      extraOptions: { maxRetries: 0 },
    }),
    putProduct: builder.mutation({
      query: ({ id, ...editProduct }) => ({
        url: `/products/${id}`,
        method: "put",
        body: editProduct,
      }),
      invalidatesTags: ["Products"],
      extraOptions: { maxRetries: 0 },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Products"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostProductMutation,
  usePutProductMutation,
  useDeleteProductMutation,
} = productApi;
