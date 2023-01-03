/* eslint-disable prettier/prettier */
import { apiSlice } from "./apiSlice";

export const deliverySubZoneApi = apiSlice.injectEndpoints({
  
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["delivery_sub_zone"],
  
  endpoints: (builder) => ({
    
    getDeliverySubZones: builder.query({
      query: () => "/delivery_sub_zone",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["delivery_sub_zone"],
    }),

    getDeliverySubZone: builder.query({
      query: (id) => `/delivery_sub_zone/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["delivery_sub_zone"],
    }),

    postDeliverySubZone: builder.mutation({
      query: (items) => ({
        url: "/delivery_sub_zone",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["delivery_sub_zone"],
      extraOptions: { maxRetries: 0 },
    }),

    putDeliverySubZone: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/delivery_sub_zone/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["delivery_sub_zone"],
      extraOptions: { maxRetries: 0 },
    }),
    
    deleteDeliverySubZone: builder.mutation({
      query: (id) => ({
        url: `/delivery_sub_zone/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["delivery_sub_zone"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { 
  useGetDeliverySubZonesQuery, 
  useGetDeliverySubZoneQuery, 
  usePostDeliverySubZoneMutation, 
  usePutDeliverySubZoneMutation, 
  useDeleteDeliverySubZoneMutation, 
} = deliverySubZoneApi;
