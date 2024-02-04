import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import menuReducer from "./slice/toggleCartSlice";
import { authApi } from "./services/authApi";
import { forAdminApi } from "./services/forAdminApi";
import { productApi } from "./services/productApi";
import { orderApi } from "./services/orderApi";
import { apiService } from "./services/apiService"; // Assuming the correct path to your apiService
import authReducer from "./slice/authSlice";
import loadingReducer from "./slice/loadingSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loading: loadingReducer,
    menu: menuReducer,
    auth: authReducer,
    [apiService.reducerPath]: apiService.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [forAdminApi.reducerPath]: forAdminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiService.middleware
      // authApi.middleware,
      // orderApi.middleware,
      // productApi.middleware,
      // forAdminApi.middleware
    ),
});
