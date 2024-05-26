import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as solidBell } from "@fortawesome/free-solid-svg-icons";
import { faBell as regularBell } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from "react";
 import {
  selectBookmark,
  addBookmark,
  removeBookmark,
} from "@/features/bookmarkSlice";
import { useAppDispatch, useAppSelector } from "@/features/Hooks";
import type { CartProductsType, ProductsDataType } from "@/clientComps/HomeState";

function TooltipComp({
  productId,
  tooltipObj,
}: {
  productId: number;
  tooltipObj: ProductsDataType;
}) {
  const [isAddedToBookmark, setIsAddedToBookmark] = useState(false);
  const bookmarkedProducts = useAppSelector(selectBookmark);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // function to check if the product added to bookmak
  function checkIfAddedToBookmark() {
    if (bookmarkedProducts.length > 0) {
      const isFound = bookmarkedProducts.some(
        (bookmark) => bookmark.id === productId
      );
      setIsAddedToBookmark(isFound);
    }
  }

  useEffect(() => {
    checkIfAddedToBookmark();
  }, [bookmarkedProducts]);

  // function to add to bookmarks
  const addToBookmark = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault(); // Prevent the default anchor behavior
    e.stopPropagation();
    if (isAddedToBookmark) {
        dispatch(removeBookmark(tooltipObj));
        
    } else {
      dispatch(addBookmark(tooltipObj));
    }
    toast({
      description: `${
        isAddedToBookmark ? "Removed from " : "Added to"
      } bookmarks`,
    });
  };

  return (
    <div className="absolute top-2 z-50 right-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full p-0 h-[30px] aspect-square"
              onClick={addToBookmark}
            >
              <FontAwesomeIcon
                icon={isAddedToBookmark ? solidBell : regularBell}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent onClick={addToBookmark}>
            <p>{isAddedToBookmark ? "Remove from " : "Add to"} bookmarks</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default TooltipComp