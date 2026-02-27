import { configureStore } from "@reduxjs/toolkit";
import materialReducer from "./slices/materialSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    materials: materialReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
