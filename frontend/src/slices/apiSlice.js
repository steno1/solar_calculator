// apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Base_url } from '../constant';

const baseQuery = fetchBaseQuery({
  baseUrl: Base_url,
  prepareHeaders: (headers, { getState }) => {
    const { userInfo } = getState().auth;
    if (userInfo && userInfo.token) {
      headers.set('Authorization', `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'LoadAnalysis', 'Inverter', 'Panel', 'Battery','ChargeController'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
