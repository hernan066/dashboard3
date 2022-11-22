/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API_URL || "http://localhost:3040/api";

const userParse = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = userParse && JSON.parse(userParse).user;
const token = currentUser?.token;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: retry(fetchBaseQuery({ baseUrl: API, headers: { "x-token": token } }), {
    maxRetries: 2,
  }),
  keepUnusedDataFor: 60, // duracion de datos en cache

  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar

  tagTypes: ["category"],

  endpoints: (builder) => ({
    getcategories: builder.query({
      query: () => "/categories",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["category"],
    }),
    postCategory: builder.mutation({
      query: (newProduct) => ({
        url: "/categories",
        method: "post",
        body: newProduct,
      }),
      invalidatesTags: ["category"],
      extraOptions: { maxRetries: 0 },
    }),
    putCategory: builder.mutation({
      query: (id, editProduct) => ({
        url: `/categories/${id}`,
        method: "put",
        body: editProduct,
      }),
      invalidatesTags: ["category"],
      extraOptions: { maxRetries: 0 },
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["category"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetcategoriesQuery,
  useGetCategoryQuery,
  usePostCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
