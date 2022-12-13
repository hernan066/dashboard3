/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "api/authApi";
import { categoryApi } from "api/categoryApi";
import { ofertApi } from "api/ofertApi";
import { orderApi } from "api/orderApi";
import { productApi } from "api/productApi";
import { userApi } from "api/userApi";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [ofertApi.reducerPath]: ofertApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
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
      .concat(orderApi.middleware),
});
