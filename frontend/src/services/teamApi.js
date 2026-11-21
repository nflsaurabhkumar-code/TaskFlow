import { baseApi } from "./baseApi";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (organizationId) => `/organizations/${organizationId}/teams`,
      providesTags: ["Team"],
    }),
    createTeam: builder.mutation({
      query: ({ organizationId, ...body }) => ({
        url: `/organizations/${organizationId}/teams`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamMutation } = teamApi;
