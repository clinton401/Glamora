"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import React, { useState, useEffect, useCallback } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { textAnimate } from "@/utils/framer-motion-utils";
import { motion } from "framer-motion";
import type { ProductsDataType } from "@/clientComps/HomeState";
import {
  useGetAllProductsQuery,
  useGetSpecificProductsQuery,
} from "@/features/apiSlice";
import { playfair } from "@/app/page";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CardSkeleton from "@/components/CardSkeleton";
import DataCard from "@/components/DataCard";
import { useAppSelector, useAppDispatch } from "@/features/Hooks";
import { selectCart, selectCartTotal, resetCart } from "@/features/cartSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { scrollToTop } from "@/utils/basic-utils";

function SearchPage() {
  const [dataArray, setDataArray] = useState<ProductsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState<
    string | undefined | FetchBaseQueryError | SerializedError
  >(undefined);
  const [searchSelectValue, setSearchSelectValue] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = searchParams.get("filter")?.toLowerCase();
  const currentPage = Number(searchParams.get("page")) || 1;
  const dispatch = useAppDispatch();
  const cartTotal = useAppSelector(selectCartTotal);
  const carts = useAppSelector(selectCart);

  const {
    data: specificProductsData,
    isLoading: specificProductsDataLoading,
    error: specificProductsDataError,
    isError: specificProductsDataIsError,
  } = useGetSpecificProductsQuery(searchQuery, {
    refetchOnReconnect: false,
    refetchOnFocus: false,
    skip: !searchQuery,
  });

  const {
    data: allProductsData,
    isLoading: allProductsDataLoading,
    error: allProductsDataError,
    isError: allProductsDataIsError,
  } = useGetAllProductsQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnFocus: false,
    skip: !!searchQuery,
  });

  // Function to create a query string
  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );

  // Function to delete a query parameter
  const deleteQuery = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  // Function to determine the slice start count
  const determineSliceStartCount = () => {
    if (page <= 1) {
      return 0;
    } else {
      const previousCount = page * dataPerPage;
      return previousCount - dataPerPage;
    }
  };

  const dataPerPage = 20;
  const sliceStartCount = determineSliceStartCount();
  const sliceEndCount = sliceStartCount + dataPerPage;
  const paginationButtonCount = Math.ceil(dataArray.length / dataPerPage);

  const isDataForCurrentPage =
    currentPage && !isLoading && !dataError
      ? currentPage <= paginationButtonCount
      : true;

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    scrollToTop();
  };

  useEffect(() => {
    if (currentPage && !Number.isNaN(currentPage) && currentPage >= 2) {
      setPage(currentPage);
    } else {
      setPage(1);
      deleteQuery("page");
    }
  }, []);

  useEffect(() => {
    if (page >= 2) {
      router.push(`${pathname}?${createQueryString("page", page.toString())}`);
    } else {
      deleteQuery("page");
    }
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      setDataArray(specificProductsData ?? []);
      setIsLoading(specificProductsDataLoading);
      setDataError(specificProductsDataIsError);
      setDataErrorMessage(specificProductsDataError);
    } else {
      setDataArray(allProductsData ?? []);
      setIsLoading(allProductsDataLoading);
      setDataError(allProductsDataIsError);
      setDataErrorMessage(allProductsDataError);
    }
  }, [
    searchQuery,
    specificProductsData,
    specificProductsDataLoading,
    specificProductsDataIsError,
    specificProductsDataError,
    allProductsData,
    allProductsDataLoading,
    allProductsDataIsError,
    allProductsDataError,
  ]);

  const getErrorMessage = (
    error: string | FetchBaseQueryError | SerializedError | undefined
  ): string => {
    if (typeof error === "string") {
      return error;
    } else if (error && "status" in error) {
      return `Error ${error.status}: ${JSON.stringify(error.data)}`;
    } else if (error && "message" in error) {
      return JSON.stringify(error.message);
    }
    return "An unknown error occurred";
  };

  // Function to set the search params
  const queryRouteHandler = (e: string) => {
    setPage(1);
    setSearchSelectValue(e);

    if (e !== "all") {
      router.push(`${pathname}?${createQueryString("filter", e)}`);
    } else {
      deleteQuery("filter");
    }
  };

  useEffect(() => {
    deleteQuery("page");
    if (searchQuery === null || searchQuery === undefined) {
      setSearchSelectValue("all");
    } else {
      setSearchSelectValue(searchQuery as string);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchSelectValue !== "all") {
      router.push(
        `${pathname}?${createQueryString("filter", searchSelectValue)}`
      );
    } else {
      deleteQuery("filter");
    }
  }, [searchSelectValue]);
  useEffect(() => {
    document.title = `Search Page - ${
      searchSelectValue
        ? searchSelectValue.charAt(0).toUpperCase() + searchSelectValue.slice(1)
        : "All "
    } Products | Glamora`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Search results for ${searchSelectValue ? searchSelectValue : "all products"}`
      );
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = `Search results for ${
        searchSelectValue ? searchSelectValue : "all"
      } products`;
      document.head.appendChild(newMetaDescription);
    }
  }, [searchSelectValue]);
  // Function to handle form submission
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length >= 1) {
      filterDataBasedOnInputValue();
    }
    else {
       setDataArray(
         searchQuery ? specificProductsData ?? [] : allProductsData ?? []
       );
     }
  };
  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  // function to filter the data based on the inputValue
  function filterDataBasedOnInputValue() {
    const lowercaseInputValue = inputValue.toLowerCase();
    const filteredResult = dataArray.filter((data) => {
      const lowercaseName = data.name.toLowerCase();
      return lowercaseName.includes(lowercaseInputValue);
    });

    setDataArray(filteredResult);
  };


  const skeletonArray = Array.from({ length: dataPerPage }, (v, i) => i + 1);



  const productTypes = [
    { id: 1, name: "Blush", path: "blush" },
    { id: 2, name: "Bronzer", path: "bronzer" },
    { id: 3, name: "Eyebrow", path: "eyebrow" },
    { id: 4, name: "Eyeliner", path: "eyeliner" },
    { id: 5, name: "Eye shadow", path: "eyeshadow" },
    { id: 6, name: "Foundation", path: "foundation" },
    { id: 7, name: "Lip liner", path: "lip_liner" },
    { id: 8, name: "Lipstick", path: "lipstick" },
    { id: 9, name: "Mascara", path: "mascara" },
    { id: 10, name: "Nail polish", path: "nail_polish" },
  ];


  if (dataError) {
    throw new Error(
      getErrorMessage(dataErrorMessage) || "An unknown error occurred"
    );
  }

  return (
    <main className="w-full pt-[80px] px-[2.5%] desktop:pt-[100px]">
      <section className="w-full pb-8 flex flex-col gap-4">
        <form onSubmit={submitHandler} className="w-full flex gap-2 ">
          <Input
            className="placeholder:italic text-xl "
            placeholder="Search for cosmetics"
            value={inputValue}
            onChange={inputChangeHandler}
            
          />
          <Button type="submit">Search</Button>
        </form>
        <div>
          <Select value={searchSelectValue} onValueChange={queryRouteHandler}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by products" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cosmetics</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {productTypes.map((product) => {
                  return (
                    <SelectItem key={product.id} value={product.path}>
                      {product.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className="w-full flex gap-y-4 gap-x-[2.5%] justify-center flex-wrap">
        {isLoading && (
          <>
            {skeletonArray.map((skeletons) => {
              return (
                <div
                  key={skeletons}
                  className="w-[48%] md:w-[23%] min-w-[170px] sm:w-[31%] desktop:w-[18%]"
                >
                  <CardSkeleton />
                </div>
              );
            })}
          </>
        )}
        {!isLoading && isDataForCurrentPage && dataArray.length > 0 && (
          <>
            {dataArray.slice(sliceStartCount, sliceEndCount).map((data) => {
              return (
                <div
                  key={data.id}
                  className="w-[48%] md:w-[23%] min-w-[170px] sm:w-[31%] desktop:w-[18%]"
                >
                  <DataCard
                    id={data.id}
                    price={data.price}
                    name={data.name}
                    api_featured_image={data.api_featured_image}
                  />
                </div>
              );
            })}
          </>
        )}
        {!isLoading && (!isDataForCurrentPage || dataArray.length === 0) && (
          <div className="w-full h-[60dvh] flex items-center justify-center min-h-[450px]">
            <h1
              className={`text-4xl font-bold w-full font-playfair ${playfair.variable} text-center `}
            >
              No Products Found
            </h1>
          </div>
        )}
      </section>
      <section className="w-full flex items-center justify-center py-16">
        <Stack spacing={2}>
          {!isLoading && isDataForCurrentPage && dataArray.length > 0 && (
            <Pagination
              count={paginationButtonCount}
              variant="outlined"
              shape="rounded"
              color="primary"
              page={page}
              onChange={handlePaginationChange}
            />
          )}
        </Stack>
      </section>
    </main>
  );
}

export default SearchPage;
