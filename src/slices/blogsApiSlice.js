import { BLOGS_URL, UPLOAD_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query({
      query: () => ({
        url: BLOGS_URL,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getBlogDetails: builder.query({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBlogs: builder.mutation({
      query: () => ({
        url: `${BLOGS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "DELETE",
      }),
    }),
    createBlogReview: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogQuery,
  useGetBlogDetailsQuery,
  useCreateBlogsMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useDeleteBlogMutation,
  useCreateBlogReviewMutation,
} = blogsApiSlice;
