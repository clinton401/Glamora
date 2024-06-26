import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ImagesComp from "./ImagesComp";
import TooltipComp from "./TooltipComp";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import type { ProductsDataType, CartProductsType } from "@/clientComps/HomeState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/features/Hooks";
import { selectCart, addToCart, removeFromCart } from "@/features/cartSlice";

function DataCard({ id, price, name, api_featured_image }: ProductsDataType) {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCart);
  const { toast } = useToast();
  // const randomPrice = Math.floor(Math.random() * 20) + 1;
  const cartPropsObj = {
    id,
    price: price && price !== "0.0" ? Number(price) : 10,
    name,
    api_featured_image,
    quantity: 1,
  };
  const tooltipObj = {
    id,
    price,
    name,
    api_featured_image,
    };

    // function to chec if the product is added to cart
    function checkIfAddedToCart() {
        if (cartProducts.length > 0) {
    const isFound = cartProducts.some(
      (product: CartProductsType) => product.id === id
    );
            setIsAddedToCart(isFound);
}
else {
     setIsAddedToCart(false);
}
    }
    useEffect(() => {
      checkIfAddedToCart();
    }, [cartProducts, isButtonClicked]);
  // function to add to or remove from cart
  const cartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default anchor behavior
    e.stopPropagation();
    setIsButtonClicked(!isButtonClicked)
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
  

  return (
    <Link href={`/details/${id}`} className="relative card_link outline-none w-full">
      <TooltipComp productId={id} tooltipObj={tooltipObj} />
      <Card className="w-full hover:bg-secondary  border-primary p-2 card font-bold transition-all ease-in duration-300 ">
        <CardHeader className="p-0   my-0 mx-auto relative w-full aspect-[1/0.7] rounded-md mb-3">
          <ImagesComp
            imgSrc={`https:${api_featured_image}`}
            alt={`${name} image`}
          />
          
        </CardHeader>
        <CardContent className="px-0 py-1">
          <h2 className="text-base truncate ">{name}</h2>
          <p className="text-sm">$ {cartPropsObj.price}</p>
        </CardContent>
        <CardFooter className="px-0 py-2">
          <Button className=" flex items-center text-xs card_footer_btn  flex-wap max-w-full" onClick={cartHandler}>
            {isAddedToCart ? "Remove from" : "Add to "} cart{" "}
            <FontAwesomeIcon icon={faShoppingCart} className="pl-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default DataCard;
