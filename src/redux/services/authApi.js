import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authHeader } from "./header";
import * as endpoints from "../../utils/endpoint";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(authHeader()),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: endpoints.ACCOUNTS_LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: endpoints.ACCOUNTS_REGISTER,
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => endpoints.ACCOUNTS_PROFILE,
    }),
    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: endpoints.ACCOUNTS_PROFILE_UPDATE,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: endpoints.ACCOUNTS_SEND_OTP,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: endpoints.ACCOUNTS_RESET_PASSWORD,
        method: "POST",
        body: resetData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: endpoints.ACCOUNTS_LOGOUT,
        method: "POST",
        body: { refresh_token: localStorage.getItem("refresh_token") },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
