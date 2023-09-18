import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["orders"],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, limit, active, paid }) =>
        `/orders/paginate?limit=${limit}&page=${page}&active=${active}&paid=${paid}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["orders"],
    }),

    getOrdersToday: builder.query({
      query: () => "/orders/today",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["orders"],
    }),
    getOrdersActive: builder.query({
      query: () => "/orders/active",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["orders"],
    }),

    getOrdersByDays: builder.query({
      query: (days) => `/orders/days/${days}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["orders"],
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["orders"],
    }),
    getClientOrder: builder.query({
      query: (id) => `/orders/client/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["orders"],
    }),

    postOrder: builder.mutation({
      query: (newOrders) => ({
        url: "/orders",
        method: "post",
        body: newOrders,
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),
    postOrderLocal: builder.mutation({
      query: (newOrders) => ({
        url: "/orders/local",
        method: "post",
        body: newOrders,
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),

    putOrder: builder.mutation({
      query: ({ id, ...editOrders }) => ({
        url: `/orders/${id}`,
        method: "put",
        body: editOrders,
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),
    putOrderSetInactiveAll: builder.mutation({
      query: () => ({
        url: `/orders/setAllOrdersToInactive`,
        method: "put",
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersTodayQuery,
  useGetOrdersActiveQuery,
  useGetOrdersByDaysQuery,
  useGetOrderQuery,
  useGetClientOrderQuery,
  usePostOrderMutation,
  usePostOrderLocalMutation,
  usePutOrderMutation,
  usePutOrderSetInactiveAllMutation,
  useDeleteOrderMutation,
} = orderApi;
