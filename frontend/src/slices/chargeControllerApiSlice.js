import { CHARGE_CONTROLLER_SIZING_URL } from '../constant'; // Correct path to your constants file
import { apiSlice } from './apiSlice'; // Import the base API slice for extending endpoints

// Extend the base API slice to include charge controller sizing endpoints
export const chargeControllerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a mutation for calculating charge controller sizing
    calculateChargeController: builder.mutation({
      query: (chargeControllerInput) => ({
        url: `${CHARGE_CONTROLLER_SIZING_URL}/calculate`, // API endpoint for calculating charge controller sizing
        method: 'POST',
        body: chargeControllerInput, // Send charge controller input data in the request body
      }),
      invalidatesTags: ['ChargeController'], // Invalidate the ChargeController tag to trigger re-fetch
    }),
  }),
});

// Export the hook for using the mutation in components
export const { useCalculateChargeControllerMutation } = chargeControllerApiSlice;
