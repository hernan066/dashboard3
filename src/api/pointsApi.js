import { apiSlice } from "./apiSlice";

export const pointsApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["points"],

  endpoints: (builder) => ({
    getAllPointsByClient: builder.query({
      query: (id) => `/points/client/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["points"],
    }),
    postPoints: builder.mutation({
      query: (newOrders) => ({
        url: "/points",
        method: "post",
        body: newOrders,
      }),
      invalidatesTags: ["points", "clients"],
      extraOptions: { maxRetries: 0 },
    }),
    postPointsReset: builder.mutation({
      query: (newOrders) => ({
        url: "/points/reset",
        method: "post",
        body: newOrders,
      }),
      invalidatesTags: ["points", "clients"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { useGetAllPointsByClientQuery, usePostPointsMutation, usePostPointsResetMutation } =
  pointsApi;
