import { LOAD_ANALYSIS_URL } from '../constant';
import apiSlice from './apiSlice';

export const loadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calculateLoadAnalysis: builder.mutation({
      query: (data) => ({
        url: `${LOAD_ANALYSIS_URL}/calculate`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['LoadAnalysis']
    })
  })
});

export const { useCalculateLoadAnalysisMutation } = loadApiSlice;
