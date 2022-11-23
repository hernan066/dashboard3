/* eslint-disable import/prefer-default-export */
/* import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userApi } from "api/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { productApi } from "api/productApi";
import { categoryApi } from "api/categoryApi";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
 */

import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "api/categoryApi";
import { productApi } from "api/productApi";
import { userApi } from "api/userApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware),
});
