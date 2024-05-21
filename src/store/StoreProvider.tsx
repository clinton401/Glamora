"use client";
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import React from "react"
import { Provider } from "react-redux"
import store from "./store"
import { productsApi } from "@/features/apiSlice"

function StoreProvider({children}: {children: React.ReactNode}) {
  return (
      <Provider store={store}>
          {/* <ApiProvider api={productsApi}> */}
              {children}
        {/* </ApiProvider> */}
    </Provider>
  )
}

export default StoreProvider
