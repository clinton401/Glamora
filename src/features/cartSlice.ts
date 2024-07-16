import { createSlice } from "@reduxjs/toolkit";
import type { CartProductsType } from "@/clientComps/HomeState";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// function to get the carts from localstarage
const getInitialCartProducts = (): CartProductsType[] => {
    if (typeof window !== "undefined") {
        const localStorageCartProducts = localStorage.getItem("cart_products");
        if (localStorageCartProducts !== null) {
            return JSON.parse(localStorageCartProducts) as CartProductsType[];
        } else {
            return []
        }
    }
    else {
        return []
    }
}
const getInitialTotal = (): number=> {
    if (typeof window !== "undefined") {
        const localStorageCartProducts = localStorage.getItem("total");
        if (localStorageCartProducts !== null) {
            return JSON.parse(localStorageCartProducts) as number;
        } else {
            return 0
        }
    }
    else {
        return 0
    }
}
// cart initial state
const initialState = {
    cartProducts: getInitialCartProducts(),
    total: getInitialTotal(),
    
};


// slice for cart actions
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductsType>) => {
      state.cartProducts.push(action.payload);
      const newTotal =
        state.total + (action.payload.price * action.payload.quantity);
      state.total = newTotal;
      // checking if we are in a server component, if we aren't we store the data to local storage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "cart_products",
          JSON.stringify(state.cartProducts)
        );
        localStorage.setItem("total", JSON.stringify(state.total));
      }
    },
    removeFromCart: (state, action: PayloadAction<CartProductsType>) => {
      const filteredResult = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
      const itemToBeRemoved = state.cartProducts.filter(product => product.id === action.payload.id)
        state.cartProducts = filteredResult;
         const newTotal =
           state.total - (action.payload.price * itemToBeRemoved[0].quantity);
         state.total = newTotal;
         // checking if we are in a server component, if we aren't we store the data to local storage
         if (typeof window !== "undefined") {
           localStorage.setItem(
             "cart_products",
             JSON.stringify(state.cartProducts)
           );
           localStorage.setItem("total", JSON.stringify(state.total));
         }
    
      },
      addToSpecificCartProductQuantity: (state, action: PayloadAction<CartProductsType>) => {
          const filteredResult = state.cartProducts.find(product => product.id === action.payload.id);
          if (filteredResult) {
           
              filteredResult.quantity += 1
              state.total += filteredResult.price;
          }
           if (typeof window !== "undefined") {
             localStorage.setItem(
               "cart_products",
               JSON.stringify(state.cartProducts)
             );
             localStorage.setItem("total", JSON.stringify(state.total));
           }
      },
      subtractFromSpecificCartProductQuantity: (state, action: PayloadAction<CartProductsType>) => {
           const filteredResult = state.cartProducts.find(
             (product) => product.id === action.payload.id
           );
           if (filteredResult && filteredResult.quantity > 1) {
              filteredResult.quantity -= 1;
              state.total -= filteredResult.price;
           }
           if (typeof window !== "undefined") {
             localStorage.setItem(
               "cart_products",
               JSON.stringify(state.cartProducts)
             );
             localStorage.setItem("total", JSON.stringify(state.total));
           }
      },
      resetCart: (state) => {
          state.cartProducts = [];
          state.total = 0;
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "cart_products",
              JSON.stringify(state.cartProducts)
            );
            localStorage.setItem("total", JSON.stringify(state.total));
          }
      }
  },
});
export const { addToCart, removeFromCart, addToSpecificCartProductQuantity, subtractFromSpecificCartProductQuantity ,resetCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.cartProducts;
export const selectCartTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
