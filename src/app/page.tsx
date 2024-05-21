"use client"

import { useGetAllProductsQuery } from "@/features/apiSlice";
export default function Home() {
    const {
    data: allProductsData,
    isLoading: allProductsDataLoading,
    error: allProductsDataError,
    isError: allProductsDataIsError,
    } = useGetAllProductsQuery({});
  
  console.log({
    allProductsData,
    allProductsDataLoading,
    allProductsDataError,
    allProductsDataIsError,
  });

  return (
   <main>
  <h1>Home</h1>
   </main>
  );
}
