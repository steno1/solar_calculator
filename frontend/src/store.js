import apiSlice from './slices/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { loadApiSlice } from './slices/loadApiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loadAnalysis: loadApiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
