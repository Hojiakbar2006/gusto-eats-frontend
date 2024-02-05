import { createSlice } from "@reduxjs/toolkit";

const orderItemSlice = createSlice({
  name: "orderItem",
  initialState: {
    open: false,
    order: {},
  },
  reducers: {
    setOrder: (state, action) => {
      state.open = action.payload.open;
      state.order = action.payload.order;
    },
  },
});

export const { setOrder } = orderItemSlice.actions;
export default orderItemSlice.reducer;
