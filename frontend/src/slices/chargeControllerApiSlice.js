// chargeControllerApiSlice.js

import { CHARGE_CONTROLLER_SIZING_URL } from '../constant';
import { apiSlice } from './apiSlice';

// Extend the base API slice to include charge controller sizing endpoints
export const chargeControllerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCalculateChargeControllerMutation } = chargeControllerApiSlice; // Export the hook for the mutation
