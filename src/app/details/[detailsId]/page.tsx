"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useParams } from "next/navigation";
import { useGetProductDetailsQuery } from "@/features/apiSlice";
import Spinner from "@/components/Spinner";
import MotionComp from "@/components/MotionComp";
import {
  rightAnimation,
  textAnimate,
  scaleAnimation,
  hiddenAnimation,
} from "@/utils/framer-motion-utils";
import ImagesComp from "@/components/ImagesComp";
import { Button } from "@/components/ui/button";
import { playfair } from "@/app/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/features/Hooks";
import { selectCart, addToCart, removeFromCart, selectCartTotal } from "@/features/cartSlice";
import type {
  ProductsDataType,
  CartProductsType,
} from "@/clientComps/HomeState";
import { useGetSpecificProductsQuery } from "@/features/apiSlice";
import { useToast } from "@/components/ui/use-toast";
import TooltipComp from "@/components/TooltipComp";
import CardSkeleton from "@/components/CardSkeleton";
import DataCard from "@/components/DataCard";
function DetailsPage() {
  const [productQuantity, setProductQuantity] = useState(1);
   const [isAddedToCart, setIsAddedToCart] = useState(false);

    const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCart);
  const cartTotal = useAppSelector(selectCartTotal);
  const { detailsId } = useParams<{ detailsId: string }>();
  const {
    data: productDetailsData,
    isLoading: productDetailsIsLoading,
    isError: productDetailsIsError,
    error: productDetailsError,
  } = useGetProductDetailsQuery(detailsId, {
    skip: !detailsId,
  });
    const {
      data: relatedProductsData,
      isLoading: relatedProductsDataLoading,
      error: relatedProductsDataError,
      isError: relatedProductsDataIsError,
    } = useGetSpecificProductsQuery(productDetailsData?.product_type, {
      refetchOnReconnect: false,
      refetchOnFocus: false,
      skip: !productDetailsData,
    });
  const { toast } = useToast();
  // const randomPrice = Math.floor(Math.random() * 20) + 1;
  const cartPropsObj = {
    id: productDetailsData?.id,
    price:
      productDetailsData?.price && productDetailsData?.price !== "0.0"
        ? Number(productDetailsData?.price)
        : 10,
    name: productDetailsData?.name,
    api_featured_image: productDetailsData?.api_featured_image,
    quantity: productQuantity,
  };
  const tooltipObj = {
    id: productDetailsData?.id,
    price: productDetailsData?.price,
    name: productDetailsData?.name,
    api_featured_image: productDetailsData?.api_featured_image,
  };
  // console.log({
  //   productDetailsData,
  //   productDetailsIsLoading,
  //   productDetailsIsError,
  //   productDetailsError,
  // });

  // console.log({ cartProducts, cartTotal });
  // function to chec if the product is added to cart
  function checkIfAddedToCart() {
    if (cartProducts.length > 0) {
      const isFound = cartProducts.some(
        (product: CartProductsType) => product.id === Number(detailsId)
      );
      setIsAddedToCart(isFound);
    } else {
      setIsAddedToCart(false);
    }
  }
const cartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default anchor behavior
    e.stopPropagation();
    if(isAddedToCart) {
        dispatch(removeFromCart(cartPropsObj));
        toast({
        description: "Removed from cart",
      });
    } else {
        dispatch(addToCart(cartPropsObj));
      toast({
        description: "Added to cart",
      });
    }
    //   toast({
    //     description: `${isAddedToCart ? "Removed from " : "Added to"} cart`,
    //   });
  };
  function addToQuantity() {
    setProductQuantity(prev => prev + 1)
  }
  function subtractQuantity() {
    if (productQuantity > 1) {
      
    setProductQuantity(prev => prev - 1);
    }
  }
   useEffect(() => {
     checkIfAddedToCart();
   }, [cartProducts]);

  useEffect(() => {
    if (productDetailsData) {
      document.title = `${productDetailsData.name} | Glamora `;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", productDetailsData.description.slice(0, 400));
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = productDetailsData.description.slice(0, 400);
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [productDetailsData]);
  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if ("status" in error) {
      // Handle FetchBaseQueryError
      return `Error ${error.status}: ${JSON.stringify(error.data)}`;
    } else if ("message" in error) {
      // Handle SerializedError
      return error.message || "An unknown error occurred";
    }
    return "An unknown error occurred";
  };
  const skeletonArray = Array.from({ length: 5 }, (v, i) => i + 1);

  if (productDetailsIsError) {
    throw new Error(
      getErrorMessage(productDetailsError) || "An unknown error occurred"
    );
  }
  if (productDetailsIsLoading) {
    return (
      <main className="h-dvh min-h-[400px] bg-background px-[5%] flex items-center justify-center ">
        <Spinner />
      </main>
    );
  }
  return (
    <>
      
    <main className="w-full  overflow-x-hidden px-[5%]  pt-[80px] desktop:pt-[100px] pb-[50px]">
      <section className="flex  justify-between w-full pb-16 gap-y-4 flex-wrap items-center">
        <MotionComp
          className="desktop:w-[45%] w-full  block relative overflow-hidden rounded-md max-h-[450px] aspect-[1/0.8] "
          variants={scaleAnimation}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <ImagesComp
            imgSrc={`https:${productDetailsData.api_featured_image}`}
            alt={`${productDetailsData.name} image`}
            detailsPg={true}
          />
        </MotionComp>

        <MotionComp
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
          className="desktop:w-[45%] items-center w-full h-full flex justify-center flex-col gap-5 "
        >
          <MotionComp
            as="h1"
            variants={rightAnimation}
            className={`font-black text-4xl    font-playfair ${playfair.variable} w-full `}
          >
            {productDetailsData.name}
          </MotionComp>
          <MotionComp as="p" variants={textAnimate} className="w-full  ">
            {productDetailsData.description.slice(0, 400)}
          </MotionComp>
          <MotionComp
            variants={textAnimate}
            className="w-full flex justify-between items-center gap-4 relative font-bold"
          >
            <p> Price: ${cartPropsObj.price}</p>
            <TooltipComp
              productId={productDetailsData?.id}
              tooltipObj={tooltipObj}
              detailsPg={true}
            />
          </MotionComp>
          <MotionComp
            variants={textAnimate}
            className="flex w-full gap-4 flex-wrap  items-center"
          >
            <span className="flex items-center justify-center gap-3">
              <Button
                variant={"outline"}
                className=" flex items-center justify-center aspect-square"
                onClick={subtractQuantity}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <p>{productQuantity}</p>
              <Button
                variant={"outline"}
                className=" flex items-center justify-center aspect-square"
                onClick={addToQuantity}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </span>
            <Button className="flex-grow min-w-[170px] " onClick={cartHandler}>
              {isAddedToCart ? "Remove from" : "Add to "} cart{" "}
              <FontAwesomeIcon icon={faShoppingCart} className="pl-1" />
            </Button>
            {/* <Button variant="outline">Read More</Button> */}
          </MotionComp>
        </MotionComp>
      </section>
      {!relatedProductsDataIsError && (
        <section className="w-full flex flex-col gap-4">
          <MotionComp
            as="h2"
            variants={textAnimate}
            className={`w-full  text-2xl font-bold font-playfair ${playfair.variable}`}
          >
            You may also like
          </MotionComp>
          <div className="w-full flex gap-y-4 gap-x-[2.5%] justify-center flex-wrap">
            {relatedProductsDataLoading && (
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
            {!relatedProductsDataLoading && relatedProductsData && (
              <>
                {relatedProductsData.slice(0, 5).map((data: ProductsDataType) => {
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
          </div>
        </section>
      )}
    </main>
    </>
  );
}

export default DetailsPage;
