import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import openSlice from "./openSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    open: openSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
