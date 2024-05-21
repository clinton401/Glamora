"use client"

import { useGetAllProductsQuery } from "@/features/apiSlice";
type ProductsDataType = {
  id: number;
  price: string;
  name: string;
  api_featured_image: string,
};
type HomeStateType = {
  allProductsData: ProductsDataType[];
  allProductsDataLoading: boolean;
  allProductsDataError: any; // Adjust the error type as per your API response
  allProductsDataIsError: boolean;
};
function HomeState(): HomeStateType {
  // getting the full products data from our store
  const {
    data: allProductsData,
    isLoading: allProductsDataLoading,
    error: allProductsDataError,
    isError: allProductsDataIsError,
  } = useGetAllProductsQuery({});
  return {
    allProductsData,
    allProductsDataLoading,
    allProductsDataError,
    allProductsDataIsError,
  };
}

export default HomeState
