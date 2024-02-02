import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true" || false,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem("isAdmin", action.payload.toString());
    },
    removeTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    removeAdminStatus: (state) => {
      state.isAdmin = false;
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { setTokens, setAdminStatus, removeTokens, removeAdminStatus } =
  authSlice.actions;
export default authSlice.reducer;
