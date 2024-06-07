"use client";
 import {
  selectBookmark,
} from "@/features/bookmarkSlice";
import {  useAppSelector } from "@/features/Hooks";
import { playfair } from "../page";
import DataCard from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import type { ProductsDataType } from "@/clientComps/HomeState";
import useNavigationUtil from "@/utils/navigation-utils";
import { useEffect } from "react";
function BookmarkPage() {
     const bookmarkedProducts = useAppSelector(selectBookmark);
  const routeHandler = useNavigationUtil("/");
   useEffect(() => {
     document.title = "Bookmark Page | Glamora";
     const metaDescription = document.querySelector('meta[name="description"]');

     const descriptionContent =
       bookmarkedProducts && bookmarkedProducts.length > 0
         ? `You have ${bookmarkedProducts.length} bookmarked items.`
         : "No bookmarks available.";

     if (metaDescription) {
       metaDescription.setAttribute("content", descriptionContent);
     } else {
       const newMetaDescription = document.createElement("meta");
       newMetaDescription.name = "description";
       newMetaDescription.content = descriptionContent;
       document.head.appendChild(newMetaDescription);
     }
   }, [bookmarkedProducts]);
    return (
      <main className="min-h-dvh  bg-background px-[2.5%]  ">
        {bookmarkedProducts.length > 0 ? (
          <section className="w-full flex flex-col pt-[80px] desktop:pt-[100px] gap-8 flex-wrap ">
            <h1
              className={`w-full text-center text-4xl font-bold font-playfair ${playfair.variable}`}
            >
              Bookmarks
            </h1>
            <div className="w-full flex  gap-x-[5%] gap-y-4 sm:gap-4 flex-wrap justify-center">
              {bookmarkedProducts.map((product: ProductsDataType) => {
                return (
                  <div
                    key={product.id}
                    className="sm:w-[18%] w-[45%] min-w-[160px]"
                  >
                    <DataCard
                      id={product.id}
                      price={product.price}
                      name={product.name}
                      api_featured_image={product.api_featured_image}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="w-full min-h-dvh pt-[80px] desktop:pt-[100px]  flex items-center justify-center gap-4 flex-col">
            <h1
              className={`w-full text-center text-4xl font-bold font-playfair ${playfair.variable}`}
            >
              No bookmarks available
            </h1>
            <Button onClick={routeHandler} className="text-white">
              Go To Homepage
            </Button>
          </section>
        )}
      </main>
    );
}
export default BookmarkPage;