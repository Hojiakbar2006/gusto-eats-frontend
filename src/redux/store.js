import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import menuReducer from "./slice/toggleCartSlice";
import { authApi } from "./services/authApi";
import { forAdminApi } from "./services/forAdminApi";
import { productApi } from "./services/productApi";
import { orderApi } from "./services/orderApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [forAdminApi.reducerPath]: forAdminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      orderApi.middleware,
      productApi.middleware,
      forAdminApi.middleware
    ),
});
