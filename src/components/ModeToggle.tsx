"use client"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button"
import MobileModeToggle from "./MobileModeToggle";


export function ModeToggle() {
  

  return (
    <div className="flex items-center gap-8 justify-center">
      <Button
        asChild
        variant="secondary"
        className="flex items-center justify-between pr-0 rounded-full gap-2 py-0 w-[250px] "
      >
        <Link href="/search">
          <p className="text-sm">Search for products</p>
          <span className=" flex items-center justify-center rounded-tr-full rounded-br-full  right-0 top-0 h-full aspect-square  bg-foreground ">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-[15px] text-background aspect-square"
            />
          </span>
        </Link>
      </Button>
      <span className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="h-4  aspect-square"
            />
          </Link>
        </Button>
        <MobileModeToggle />
      </span>
    </div>
  );
}
