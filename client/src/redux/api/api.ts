import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-todo-phi-seven.vercel.app/",
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => ({
        url: `/tasks?priority=${priority}`,
        method: "GET",
      }),
      providesTags: ["todos"],
    }),
    getSingleTodo: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: ["todos"],
    }),
    createTodo: builder.mutation({
      query: (data) => {
        return {
          url: "/task",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        return {
          url: `/task/${options._id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetSingleTodoQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
