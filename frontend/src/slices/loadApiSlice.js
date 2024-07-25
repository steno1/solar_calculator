import apiSlice from './apiSlice';

export const loadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calculateLoadAnalysis: builder.mutation({
      query: (data) => ({
        url: '/api/load-analysis',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['LoadAnalysis']
    })
  })
});

export const { useCalculateLoadAnalysisMutation } = loadApiSlice;
