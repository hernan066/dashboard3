/* eslint-disable prettier/prettier */
import { apiSlice } from "./apiSlice";

export const distributorApi = apiSlice.injectEndpoints({
  
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["distributors"],
  
  endpoints: (builder) => ({
    
    getDistributors: builder.query({
      query: () => "/distributors",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["distributors"],
    }),

    getDistributor: builder.query({
      query: (id) => `/distributors/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["distributors"],
    }),

    postDistributor: builder.mutation({
      query: (items) => ({
        url: "/distributors",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["distributors"],
      extraOptions: { maxRetries: 0 },
    }),

    putDistributor: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/distributors/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["distributors"],
      extraOptions: { maxRetries: 0 },
    }),
    
    deleteDistributor: builder.mutation({
      query: (id) => ({
        url: `/distributors/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["distributors"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { 
  useGetDistributorsQuery, 
  useGetDistributorQuery, 
  usePostDistributorMutation, 
  usePutDistributorMutation, 
  useDeleteDistributorMutation, 
} = distributorApi;
