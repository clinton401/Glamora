"use client"
import { useAppDispatch, useAppSelector } from "@/features/Hooks";
import {
  selectCart,
  removeFromCart,
  selectCartTotal,
  resetCart,
  addToSpecificCartProductQuantity,
  subtractFromSpecificCartProductQuantity,
} from "@/features/cartSlice";
import type {
  ProductsDataType,
  CartProductsType,
} from "@/clientComps/HomeState";
import {
  faPlus,
  faMinus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@/components/ui/use-toast";
import ImagesComp from "@/components/ImagesComp";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { playfair } from "@/app/page";
import { Button } from "@/components/ui/button";
import useNavigationUtil from "@/utils/navigation-utils";
import { useEffect } from "react";
function CartTable() {
    const cartProducts = useAppSelector(selectCart);
    const cartTotal = useAppSelector(selectCartTotal);
    const navigate = useNavigationUtil("/search");
    const {toast} = useToast();
       const dispatch = useAppDispatch();
  useEffect(() => {
     document.title = "Cart Page | Glamora";
     const metaDescription = document.querySelector('meta[name="description"]');

     const descriptionContent =
       cartProducts && cartProducts.length > 0
         ? `You have ${cartProducts.length} cart items.`
         : "No Carts available.";

     if (metaDescription) {
       metaDescription.setAttribute("content", descriptionContent);
     } else {
       const newMetaDescription = document.createElement("meta");
       newMetaDescription.name = "description";
       newMetaDescription.content = descriptionContent;
       document.head.appendChild(newMetaDescription);
     }
   }, [cartProducts]);
    const removeFromCartHandler = (cartPropsObj: CartProductsType) => {
  dispatch(removeFromCart(cartPropsObj));
        toast({
        description: "Removed from cart",
      });

    };
    function productQuantityHandler(
      add: boolean,
      cartPropsObj: CartProductsType
    ) {
      if (add) {
        dispatch(addToSpecificCartProductQuantity(cartPropsObj));
      } else {
           dispatch(subtractFromSpecificCartProductQuantity(cartPropsObj));
        }
    }
    return (
      <section className="w-full overflow-x-auto pb-12">
        {cartProducts.length > 0 ? (
          <Table className="min-w-[700px]">
            <TableCaption>Your cart list.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[45%]">Products</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">SubTotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((product) => {
                const { id, name, price, api_featured_image, quantity } =
                  product;
                const subTotal = price * quantity;

                const cartPropsObj = {
                  id,
                  name,
                  price,
                  api_featured_image,
                  quantity,
                };
                return (
                  <TableRow key={id}>
                    <TableCell className="font-bold flex items-center gap-2">
                      <div className="w-[70px] aspect-square relative ">
                        <ImagesComp
                          imgSrc={`https:${api_featured_image}`}
                          alt={`${name} image`}
                        />
                      </div>
                      <div className="">
                        <h3 className="text-base pb-1">{name}</h3>

                        <Button
                          className="h-auto p-2"
                          variant="secondary"
                          onClick={() => removeFromCartHandler(cartPropsObj)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className=" flex gap-2 items-center ">
                        <Button
                          variant={"outline"}
                          className=" flex items-center justify-center aspect-square"
                          onClick={() =>
                            productQuantityHandler(false, cartPropsObj)
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        {quantity}
                        <Button
                          variant={"outline"}
                          className=" flex items-center justify-center aspect-square"
                          onClick={() =>
                            productQuantityHandler(true, cartPropsObj)
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>${price}</TableCell>
                    <TableCell className="text-right font-bold">
                      ${subTotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total: ${cartTotal.toFixed(2)}</TableCell>
                <TableCell colSpan={3} className="text-right">
                  <Button onClick={() => dispatch(resetCart())}>
                    Clear All
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex items-center justify-center flex-col gap-4 min-h-[450px]">
            <h2
              className={`${playfair.variable} w-full text-center  font-bold text-3xl font-playfair`}
            >
              You have no items in your cart
            </h2>
            <Button onClick={navigate}>Shop now</Button>
          </div>
        )}
      </section>
    );
}

export default CartTable;
