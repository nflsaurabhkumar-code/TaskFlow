import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (organizationId) => `/organizations/${organizationId}/projects`,
      providesTags: ["Project"],
    }),
    createProject: builder.mutation({
      query: ({ organizationId, ...body }) => ({
        url: `/organizations/${organizationId}/projects`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
