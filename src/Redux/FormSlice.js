import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "form",
  initialState: { list: [] },
  reducers: {
    set(state, action) {
      state.list.push(action.payload);
    },
    get(state, action) {
      state.list = action.payload;
    },
    remove(state, action) {
      state.list = state.list.filter(
        (item) => item.nameV !== action.payload.nameV
      );
    },
    update(state, action) {
      let index = state.list.findIndex(
        (items) => items.nameV === action.payload.item.nameV
      );
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.obj };
      }
    },
    quantityReduce(state, action) {
      let index = state.list.findIndex(
        (items) => items.nameV === action.payload.nameV
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          quantity: state.list[index].quantity - 1,
        };
      }
    },
    quantityIncrease(state, action) {
      let index = state.list.findIndex(
        (items) => items.nameV === action.payload.nameV
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          quantity: state.list[index].quantity + 1,
        };
      }
    },
  },
});

export const listAction = FormSlice.actions;
export default FormSlice.reducer;
