"use client";
import React, { useState, useEffect } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { textAnimate } from "@/utils/framer-motion-utils";
import { motion } from "framer-motion";
import SkeletonCarouselComp from "@/components/SkeletonCarouselComp";
import DataCarouselComp from "@/components/DataCarouselComp";
import type { ProductsDataType } from "./HomeState";
import {
  useGetAllProductsQuery,
  useGetSpecificProductsQuery,
} from "@/features/apiSlice";
import { playfair } from "@/app/page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function HomeCarouselComp({
  dataFetchingParam,
  title,
}: {
  dataFetchingParam?: string;
  title: string;
}) {
  const [dataArray, setDataArray] = useState<ProductsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState<
    string | undefined | FetchBaseQueryError | SerializedError
  >(undefined);

  const {
    data: specificProductsData,
    isLoading: specificProductsDataLoading,
    error: specificProductsDataError,
    isError: specificProductsDataIsError,
  } = useGetSpecificProductsQuery(dataFetchingParam, {
    refetchOnReconnect: false,
    refetchOnFocus: false,
    skip: !dataFetchingParam,
  });

  const {
    data: allProductsData,
    isLoading: allProductsDataLoading,
    error: allProductsDataError,
    isError: allProductsDataIsError,
  } = useGetAllProductsQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnFocus: false,
    skip: !!dataFetchingParam,
  });

  useEffect(() => {
    if (dataFetchingParam) {
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
    dataFetchingParam,
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
  const skeletonArray = Array.from({ length: 10 }, (v, i) => i + 1);
    if (dataError) {
        throw new Error(getErrorMessage(dataErrorMessage)  || 'An unknown error occurred');
}
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col w-full pb-12 gap-6 items-center"
    >
      <motion.span
        className="flex gap-x-2 gap-y-4 items-center w-full justify-between "
        variants={textAnimate}
      >
        <motion.h2
          className={`text-2xl sm:text-3xl font-semibold ${playfair.variable} font-playfair`}
        >
          {title}
        </motion.h2>
        <Link
          href={
            dataFetchingParam
              ? `/search?filter=${dataFetchingParam}`
              : "/search"
          }
          className=" hover:underline focus:underline"
        >View more <FontAwesomeIcon icon={faArrowRight} className="pl-1 text-xs"/></Link>
      </motion.span>

      <Carousel className="w-full">
        <CarouselContent>
          {isLoading ? (
            <SkeletonCarouselComp dataArray={skeletonArray} />
          ) : (
            <DataCarouselComp dataArray={dataArray} />
          )}
        </CarouselContent>
        <CarouselPrevious className="md:-left-12 left-0" />
        <CarouselNext className="md:-right-12 right-0" />
      </Carousel>
    </motion.section>
  );
}

export default HomeCarouselComp;
