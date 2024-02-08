import { configureStore } from "@reduxjs/toolkit";
import { authApi, forAdminApi, orderApi, productApi } from "./api/endpoints";
import apiService from "./api/apiService";

import { loading } from "./slice/loadingSlice";
import cartReducer from "./slice/cartSlice";
import menuReducer from "./slice/toggleCartSlice";
import authReducer from "./slice/authSlice";
import orderItemReducer from "./slice/orderItemSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    auth: authReducer,
    orderItem: orderItemReducer,
    loading,
    [apiService.reducerPath]: apiService.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [forAdminApi.reducerPath]: forAdminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
