// store.js

import apiSlice from './slices/apiSlice'; // Import the API slice for handling API interactions
import authReducer from './slices/authSlice'; // Import the authentication slice for handling user authentication
import { batteryApiSlice } from './slices/batteryApiSlice'; // Import the battery API slice for handling battery sizing API interactions
import { chargeControllerApiSlice } from './slices/chargeControllerApiSlice'; // Import the charge controller API slice for handling charge controller sizing API interactions
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit for creating the Redux store
import { inverterApiSlice } from './slices/inverterApiSlice'; // Import the inverter API slice for handling inverter sizing API interactions
import { loadApiSlice } from './slices/loadApiSlice'; // Import the load API slice for handling load analysis API interactions
import { panelApiSlice } from './slices/panelApiSlice'; // Import the panel API slice for handling panel sizing API interactions

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer to handle API interactions
    loadAnalysis: loadApiSlice.reducer, // Add the loadApiSlice reducer to handle load analysis state
    inverterSizing: inverterApiSlice.reducer, // Add the inverterApiSlice reducer to handle inverter sizing state
    panelSizing: panelApiSlice.reducer, // Add the panelApiSlice reducer to handle panel sizing state
    batterySizing: batteryApiSlice.reducer, // Add the batteryApiSlice reducer to handle battery sizing state
    chargeControllerSizing: chargeControllerApiSlice.reducer, // Add the chargeControllerApiSlice reducer to handle charge controller sizing state
    auth: authReducer, // Add the authReducer to handle authentication state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      batteryApiSlice.middleware,
      chargeControllerApiSlice.middleware // Add chargeControllerApiSlice middleware for handling API calls
    ),
});

export default store;
