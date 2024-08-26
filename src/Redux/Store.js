import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./FormSlice";
import CartSlice from "./CartSlice";

const Store = configureStore({
  reducer: {
    List: FormSlice,
    Cart: CartSlice,
  },
});

export default Store;
