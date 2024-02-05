import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openCart, closeCart, toggle } = menuSlice.actions;
export default menuSlice.reducer;
