import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Blog", "Order", "User"],
  endpoints: (builder) => ({}),
});
