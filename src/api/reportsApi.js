import { apiSlice } from "./apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["reports"],

  endpoints: (builder) => ({
    getOrdersByMonth: builder.query({
      query: () => "/reports/ordersByMonth",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
    getOrdersByDay: builder.query({
      query: () => "/reports/ordersByDay",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
    getTotalOrderProducts: builder.query({
      query: () => "/reports/totalOrderProducts",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
    getNewClientByMonth: builder.query({
      query: () => "/reports/newClientByMonth",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["reports"],
    }),
  }),
});

export const {
  useGetOrdersByMonthQuery,
  useGetOrdersByDayQuery,
  useGetTotalOrderProductsQuery,
  useGetNewClientByMonthQuery,
} = clientApi;
