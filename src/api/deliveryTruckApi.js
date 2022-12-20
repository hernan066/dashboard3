/* eslint-disable prettier/prettier */
import { apiSlice } from "./apiSlice";

export const deliveryTruckApi = apiSlice.injectEndpoints({
  
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["delivery_trucks"],
  
  endpoints: (builder) => ({
    
    getDeliveryTrucks: builder.query({
      query: () => "/delivery_trucks",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["delivery_trucks"],
    }),

    getDeliveryTruck: builder.query({
      query: (id) => `/delivery_trucks/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["delivery_trucks"],
    }),

    postDeliveryTruck: builder.mutation({
      query: (items) => ({
        url: "/delivery_trucks",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["delivery_trucks"],
      extraOptions: { maxRetries: 0 },
    }),

    putDeliveryTruck: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/delivery_trucks/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["delivery_trucks"],
      extraOptions: { maxRetries: 0 },
    }),
    
    deleteDeliveryTruck: builder.mutation({
      query: (id) => ({
        url: `/delivery_trucks/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["delivery_trucks"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { 
  useGetDeliveryTrucksQuery, 
  useGetDeliveryTruckQuery, 
  usePostDeliveryTruckMutation, 
  usePutDeliveryTruckMutation, 
  useDeleteDeliveryTruckMutation, 
} = deliveryTruckApi;
