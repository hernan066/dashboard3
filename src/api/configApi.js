import { apiSlice } from "./apiSlice";

export const configApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["config"],

  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => "/config",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["config"],
    }),

    putConfig: builder.mutation({
      query: ({ ...items }) => ({
        url: `/config`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["config"],
      extraOptions: { maxRetries: 0 },
    }),

    setConfigActiveClient: builder.mutation({
      query: () => ({
        url: `/config/setConfigActiveClient`,
        method: "post",
      }),
      invalidatesTags: ["config"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { useGetConfigQuery, usePutConfigMutation, useSetConfigActiveClientMutation } =
  configApi;
