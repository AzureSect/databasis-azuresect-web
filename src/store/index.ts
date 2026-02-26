import { configureStore } from "@reduxjs/toolkit";
import materialReducer from "./slices/materialSlice";

export const store = configureStore({
  reducer: {
    materials: materialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
