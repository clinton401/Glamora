"use client"

import { useGetAllProductsQuery } from "@/features/apiSlice";
export type ProductsDataType = {
  id: number;
  price: string;
  name: string;
  api_featured_image: string,
};
export type CartProductsType = {
  id: number;
  price: number;
  name: string;
  api_featured_image: string;
  quantity: number;
};
type HomeStateType = {
  allProductsData: ProductsDataType[];
  allProductsDataLoading: boolean;
  allProductsDataError: any; // Adjust the error type as per your API response
  allProductsDataIsError: boolean;
};
export function HomeState(): HomeStateType {
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

// export const fetchedData = HomeState()
