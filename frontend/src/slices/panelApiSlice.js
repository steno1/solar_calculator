// Import the PANEL_SIZING_URL constant from the constants file

import { PANEL_SIZING_URL } from '../constant';
import apiSlice from './apiSlice';

// Import the base apiSlice which is likely configured with the base API settings


// Define and export the panelApiSlice which extends the base apiSlice
export const panelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a mutation endpoint for calculating panel sizing
    calculatePanelSizing: builder.mutation({
      // Specify the query details for this mutation
      query: (data) => ({
        url: `${PANEL_SIZING_URL}/calculate`, // Endpoint URL for the request
        method: 'POST', // HTTP method to use for the request
        body: data, // The request payload, which contains the data to be sent
      }),
      // Invalidate the 'Panel' tag to ensure cache is refreshed after this mutation
      invalidatesTags: ['Panel'],
    }),
  }),
});

// Export the hook for using the calculatePanelSizing mutation in components
export const { useCalculatePanelSizingMutation } = panelApiSlice;
