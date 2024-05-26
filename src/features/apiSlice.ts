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
    getSpecificProducts: builder.query({
      query: (product_type) => `products.json?product_type=${product_type}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSpecificProductsQuery } = productsApi;