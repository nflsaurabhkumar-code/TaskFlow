import { baseApi } from "./baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ organizationId, ...params }) => ({
        url: `/organizations/${organizationId}/tasks`,
        params,
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: ({ organizationId, ...body }) => ({
        url: `/organizations/${organizationId}/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ organizationId, taskId, ...body }) => ({
        url: `/organizations/${organizationId}/tasks/${taskId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: ({ organizationId, taskId }) => ({
        url: `/organizations/${organizationId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
