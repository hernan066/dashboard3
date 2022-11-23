/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API_URL || "http://localhost:3040/api";

const token = localStorage.getItem("token");

export const ofertApi = createApi({
  reducerPath: "ofertApi",
  baseQuery: retry(fetchBaseQuery({ baseUrl: API, headers: { "x-token": token } }), {
    maxRetries: 2,
  }),
  keepUnusedDataFor: 60, // duracion de datos en cache

  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar

  tagTypes: ["Oferts"],

  endpoints: (builder) => ({
    getOferts: builder.query({
      query: () => "/oferts",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["Oferts"],
    }),
    getOfert: builder.query({
      query: (id) => `/oferts/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["Oferts"],
    }),
    postOfert: builder.mutation({
      query: (newOfert) => ({
        url: "/oferts",
        method: "post",
        body: newOfert,
      }),
      invalidatesTags: ["Oferts"],
      extraOptions: { maxRetries: 0 },
    }),
    putOfert: builder.mutation({
      query: ({ id, ...editOfert }) => ({
        url: `/oferts/${id}`,
        method: "put",
        body: editOfert,
      }),
      invalidatesTags: ["Oferts"],
      extraOptions: { maxRetries: 0 },
    }),
    deleteOfert: builder.mutation({
      query: (id) => ({
        url: `/oferts/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Oferts"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetOfertsQuery,
  useGetOfertQuery,
  usePostOfertMutation,
  usePutOfertMutation,
  useDeleteOfertMutation,
} = ofertApi;
