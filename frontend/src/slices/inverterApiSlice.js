import { INVERTER_SIZING_URL } from '../constant';
import apiSlice from './apiSlice';

// Extend the base API slice with new endpoints for inverter sizing
export const inverterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a mutation for calculating inverter sizing
    calculateInverterSizing: builder.mutation({
      query: (data) => ({
        url: `${INVERTER_SIZING_URL}/calculate`, // Endpoint URL for the mutation
        method: 'POST', // HTTP method for the mutation
        body: data, // Data to be sent in the request body
      }),
      invalidatesTags: ['Inverter'], // Invalidate 'Inverter' tags to trigger re-fetching of related data
    }),
  }),
});

// Export the custom hook generated by RTK Query for the calculateInverterSizing mutation
export const { useCalculateInverterSizingMutation } = inverterApiSlice;
