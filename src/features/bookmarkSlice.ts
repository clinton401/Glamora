import { createSlice } from "@reduxjs/toolkit";
import type { ProductsDataType } from "@/clientComps/HomeState";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Function to safely get initial state from localStorage
const getInitialState = (): ProductsDataType[] => {
  if (typeof window !== "undefined") {
    const localstorageProducts = localStorage.getItem("bookmark_products");
    if (localstorageProducts !== null) {
      return JSON.parse(localstorageProducts) as ProductsDataType[];
    } else {
        return []
    }
  }
  return [];
};

// initial state for the bookmark data
const initialState = {
  products: getInitialState(),
};

// slice for creating actions for the bookmark data
const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<ProductsDataType>) => {
      state.products.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "bookmark_products",
          JSON.stringify(state.products)
        );
      }
    },
    removeBookmark: (state, action: PayloadAction<ProductsDataType>) => {
      const filteredResult = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.products = filteredResult;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "bookmark_products",
          JSON.stringify(state.products)
        );
      }
    },
    resetBookmark: (state) => {
      state.products = [];
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "bookmark_products",
          JSON.stringify(state.products)
        );
      }
    },
  },
});

export const { addBookmark, removeBookmark, resetBookmark } =
  bookmarkSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBookmark = (state: RootState) => state.bookmark.products;

export default bookmarkSlice.reducer;
