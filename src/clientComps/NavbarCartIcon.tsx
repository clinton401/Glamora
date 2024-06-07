"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/features/Hooks";
import { selectCart } from "@/features/cartSlice";

function NavbarCartIcon() {
  const cartProducts = useAppSelector(selectCart);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartProducts.length);
  }, [cartProducts]);

  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/cart" className="relative">
        {cartCount > 0 && (
          <p className="h-4 flex items-center justify-center text-xs absolute rounded-full bg-primary aspect-square bottom-[70%] left-[70%]">
            {cartCount}
          </p>
        )}

        <FontAwesomeIcon icon={faCartShopping} className="h-4 aspect-square" />
      </Link>
    </Button>
  );
}

export default NavbarCartIcon;
