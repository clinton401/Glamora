import { configureStore, Middleware, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "@/features/apiSlice";
import bookmarkSlice from "@/features/bookmarkSlice";
import cartSlice from "@/features/cartSlice";




const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    bookmark: bookmarkSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
