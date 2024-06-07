import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://makeup-api.herokuapp.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products.json",
      keepUnusedDataFor: 300, // Cache the data for 5 minutes
    }),
    getSpecificProducts: builder.query({
      query: (product_type) => `products.json?product_type=${product_type}`,
      keepUnusedDataFor: 300, // Cache the data for 5 minutes
    }),
    getProductDetails: builder.query({
      query: (product_id) => `/products/${product_id}.json`,
      keepUnusedDataFor: 300, // Cache the data for 5 minutes
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSpecificProductsQuery, useGetProductDetailsQuery } = productsApi;