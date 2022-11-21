/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API_URL || "http://localhost:3040/api";

const userParse = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = userParse && JSON.parse(userParse).user;
const token = currentUser?.token;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: retry(fetchBaseQuery({ baseUrl: API, headers: { "x-token": token } }), {
    maxRetries: 2,
  }),
  keepUnusedDataFor: 60, // duracion de datos en cache

  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["Users"],
    }),
    postUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "post",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, usePostUserMutation } = userApi;
