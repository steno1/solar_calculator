import { AUTH_URL, USER_URL } from "../constant";

import apiSlice from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => `${USER_URL}/all`,
      providesTags: ["Users"],
    }),
   

    // Get user details endpoint
    getUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
      }),
      providesTags: ["Users"], // Provide caching tags for users
      keepUnusedDataFor: 5 // Keep unused user data for 5 seconds
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} = userApiSlice;
