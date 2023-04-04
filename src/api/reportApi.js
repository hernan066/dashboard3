import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["reports"],

  endpoints: (builder) => ({
    getTotalOrderProductsByDay: builder.query({
      query: () => "/reports/totalOrderProductsByDay",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
    getTotalOrders: builder.query({
      query: () => "/reports/orders",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
    getTotalOrdersProducts: builder.query({
      query: () => "/reports/totalOrderProducts",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
    getTotalOrdersProducts2103: builder.query({
      query: () => "/reports/totalOrderProducts21_03",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),

    postTotalOrderProductsByRange: builder.mutation({
      query: (items) => ({
        url: "/reports/totalOrderProductsByRangeTest",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["reports"],
      extraOptions: { maxRetries: 0 },
    }),
    postReportPaymentByRangeDay: builder.mutation({
      query: (items) => ({
        url: "/reports/reportPaymentByRangeDay",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["reports"],
      extraOptions: { maxRetries: 0 },
    }),
    postReportSellByRangeDay: builder.mutation({
      query: (items) => ({
        url: "/reports/reportTotalSellByRangeDay",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["reports"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetTotalOrderProductsByDayQuery,
  useGetTotalOrdersQuery,
  useGetTotalOrdersProductsQuery,
  useGetTotalOrdersProducts2103Query,
  usePostTotalOrderProductsByRangeMutation,
  usePostReportPaymentByRangeDayMutation,
  usePostReportSellByRangeDayMutation,
} = userApi;
