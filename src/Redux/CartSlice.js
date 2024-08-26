import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    add(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameV === action.payload.nameV
      );
      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount + 1,
        };
      }
    },
    increase(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameV === action.payload.nameV
      );
      state.cart[index] = {
        ...state.cart[index],
        amount: state.cart[index].amount + 1,
      };
    },
    decrease(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameV === action.payload.nameV
      );
      let reqA = state.cart[index].amount;
      if (reqA > 1) {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount - 1,
        };
      } else {
        state.cart = state.cart.filter(
          (item) => item.nameV !== action.payload.nameV
        );
      }
    },
  },
});

export const cartAction = CartSlice.actions;
export default CartSlice.reducer;
