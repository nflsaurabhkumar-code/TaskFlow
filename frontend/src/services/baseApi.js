import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// One base API for the whole app.
// Each feature adds its own endpoints in its own file (authApi.js, taskApi.js ...)
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include", // send the login cookie with every request
  }),
  tagTypes: ["Auth", "Organization", "Team", "Project", "Task"],
  endpoints: () => ({}),
});
