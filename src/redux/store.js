/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "api/authApi";
import { categoryApi } from "api/categoryApi";
import { deliveryZoneApi } from "api/deliveryZoneApi";
import { ofertApi } from "api/ofertApi";
import { orderApi } from "api/orderApi";
import { productApi } from "api/productApi";
import { userApi } from "api/userApi";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./ordersSlice";
import positionsReducer from "./positionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    positions: positionsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [ofertApi.reducerPath]: ofertApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [deliveryZoneApi.reducerPath]: deliveryZoneApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(ofertApi.middleware)
      .concat(authApi.middleware)
      .concat(deliveryZoneApi.middleware),
});
