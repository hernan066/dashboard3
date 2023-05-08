import { apiSlice } from "./apiSlice";

export const recommendationApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["recommendation"],

  endpoints: (builder) => ({
    getAllRecommendationByClient: builder.query({
      query: (id) => `/recommendation/client/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["recommendation"],
    }),
  }),
});

export const { useGetAllRecommendationByClientQuery } = recommendationApi;
