import { BATTERY_SIZING_URL } from '../constant';
import { apiSlice } from './apiSlice';

// Extend the base API slice to include battery sizing endpoints
export const batteryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calculateBatterySizing: builder.mutation({
      query: (batteryInput) => ({
        url: `${BATTERY_SIZING_URL}/calculate`, // API endpoint for calculating battery sizing
        method: 'POST',
        body: batteryInput, // Send battery input data in the request body
      }),
      invalidatesTags: ['Battery'], // Invalidate the Battery tag to trigger re-fetch
    }),
  }),
});

export const { useCalculateBatterySizingMutation } = batteryApiSlice; // Export the hook for the mutation
