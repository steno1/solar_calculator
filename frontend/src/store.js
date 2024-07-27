import apiSlice from './slices/apiSlice'; // Import the API slice for handling API interactions
import authReducer from './slices/authSlice'; // Import the authentication slice for handling user authentication
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit for creating the Redux store
import { loadApiSlice } from './slices/loadApiSlice'; // Import the load API slice for handling load analysis API interactions

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer to handle API interactions
    loadAnalysis: loadApiSlice, // Add the loadApiSlice reducer to handle load analysis state
    auth: authReducer, // Add the authReducer to handle authentication state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add default middleware and concatenate with apiSlice middleware for handling API calls
});

export default store;
