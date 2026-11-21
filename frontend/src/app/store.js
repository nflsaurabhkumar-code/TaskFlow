import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";

// The endpoint files (authApi.js, taskApi.js ...) add themselves to baseApi
// when they are imported, so the store only needs baseApi.
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
