/* eslint-disable prettier/prettier */
import { apiSlice } from "./apiSlice";

export const deliveryZoneApi = apiSlice.injectEndpoints({
  
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["delivery_zone"],
  
  endpoints: (builder) => ({
    
    getDeliveryZones: builder.query({
      query: () => "/delivery_zone",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["delivery_zone"],
    }),

    getDeliveryZone: builder.query({
      query: (id) => `/delivery_zone/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["delivery_zone"],
    }),

    postDeliveryZone: builder.mutation({
      query: (items) => ({
        url: "/delivery_zone",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["delivery_zone"],
      extraOptions: { maxRetries: 0 },
    }),

    putDeliveryZone: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/delivery_zone/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["delivery_zone"],
      extraOptions: { maxRetries: 0 },
    }),
    
    deleteDeliveryZone: builder.mutation({
      query: (id) => ({
        url: `/delivery_zone/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["delivery_zone"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { 
  useGetDeliveryZonesQuery, 
  useGetDeliveryZoneQuery, 
  usePostDeliveryZoneMutation, 
  usePutDeliveryZoneMutation, 
  useDeleteDeliveryZoneMutation, 
} = deliveryZoneApi;
