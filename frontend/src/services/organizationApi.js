import { baseApi } from "./baseApi";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => "/organizations",
      providesTags: ["Organization"],
    }),
    createOrganization: builder.mutation({
      query: (body) => ({ url: "/organizations", method: "POST", body }),
      invalidatesTags: ["Organization"],
    }),
  }),
});

export const { useGetOrganizationsQuery, useCreateOrganizationMutation } =
  organizationApi;
