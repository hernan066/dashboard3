/* eslint-disable prettier/prettier */
import { apiSlice } from "./apiSlice";

export const supplierApi = apiSlice.injectEndpoints({
  
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["suppliers"],
  
  endpoints: (builder) => ({
    
    getSuppliers: builder.query({
      query: () => "/suppliers",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["suppliers"],
    }),

    getSupplier: builder.query({
      query: (id) => `/suppliers/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["suppliers"],
    }),

    postSuppliers: builder.mutation({
      query: (newSuppliers) => ({
        url: "/suppliers",
        method: "post",
        body: newSuppliers,
      }),
      invalidatesTags: ["suppliers"],
      extraOptions: { maxRetries: 0 },
    }),

    putSuppliers: builder.mutation({
      query: ({ id, ...editSuppliers }) => ({
        url: `/suppliers/${id}`,
        method: "put",
        body: editSuppliers,
      }),
      invalidatesTags: ["suppliers"],
      extraOptions: { maxRetries: 0 },
    }),
    
    deleteSuppliers: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["suppliers"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { 
  useGetSuppliersQuery, 
  useGetSupplierQuery, 
  usePostSuppliersMutation, 
  usePutSuppliersMutation, 
  useDeleteSuppliersMutation, 
} = supplierApi;
