import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://makeup-api.herokuapp.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products.json",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;