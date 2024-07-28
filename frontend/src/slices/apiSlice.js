// apislice.js

// Import necessary functions from @reduxjs/toolkit/query/react

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Base_url } from '../constant';

// Import the base URL constant


// Create a base query with fetchBaseQuery function
const baseQuery = fetchBaseQuery({
  baseUrl: Base_url, // Set the base URL for API requests
  prepareHeaders: (headers, { getState }) => {
    const { userInfo } = getState().auth; // Get the user information from the state
    if (userInfo && userInfo.token) {
      headers.set('Authorization', `Bearer ${userInfo.token}`); // Set the Authorization header with the token
    }
    return headers; // Return the modified headers
  },
});

// Create an API slice using createApi function
export const apiSlice = createApi({
  baseQuery, // Use the base query defined above
  tagTypes: ['User', 'LoadAnalysis', 'Inverter'], // Define tag types for cache invalidation and refetching
  endpoints: (builder) => ({}), // Define endpoints (initially empty)
});

// Export the apiSlice as default
export default apiSlice;
