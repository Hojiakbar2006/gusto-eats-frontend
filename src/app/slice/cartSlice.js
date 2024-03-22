import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const cartData = JSON.parse(localStorage.getItem("cart")) || {};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartData.cartItems || [],
    total: cartData.total || 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (newItem.countInStock <= 0) {
        message.info("No product in stock");
        return;
      }

      if (existingItem) {
        if (existingItem.quantity === existingItem.countInStock) {
          message.info("Product is out of stock");
          return;
        }
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.quantity += 1;
      state.total += newItem.price;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.items,
          total: state.total,
          quantity: state.quantity,
        })
      );
      message.success("Product has been added to cart");
    },

    addQty(state, action) {
      const addedItem = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === addedItem.id && item.quantity + 1 <= item.countInStock
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + addedItem.price,
            }
          : item
      );

      const isAddQtyStockAvailable = updatedItems.some(
        (item) =>
          item.id === addedItem.id && item.quantity + 1 <= item.countInStock
      );

      if (isAddQtyStockAvailable) {
        state.total += addedItem.price;
        state.items = updatedItems;
      } else {
        message.info("No Product in stock");
      }

      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.items,
          total: state.total,
          quantity: state.quantity,
        })
      );
    },

    removeQty(state, action) {
      const removedQtyItem = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === removedQtyItem.id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.totalPrice - removedQtyItem.price,
            }
          : item
      );

      const isRemoveQtyStockAvailable = updatedItems.some(
        (item) => item.id === removedQtyItem.id && item.quantity >= 1
      );

      if (isRemoveQtyStockAvailable) {
        state.total -= removedQtyItem.price;
        state.items = updatedItems;
        localStorage.setItem(
          "cart",
          JSON.stringify({
            cartItems: state.items,
            total: state.total,
          })
        );
      }
    },

    removeFromCart(state, action) {
      const idToRemove = action.payload.id;
      const itemToRemove = state.items.find((item) => item.id === idToRemove);
      if (itemToRemove) {
        state.total -= itemToRemove.price * itemToRemove.quantity;
        state.quantity -= itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== idToRemove);
        localStorage.setItem(
          "cart",
          JSON.stringify({
            cartItems: state.items,
            total: state.total,
          })
        );
      }
    },

    deleteCart(state) {
      state.items = [];
      state.total = 0;
      state.quantity = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, addQty, removeQty, removeFromCart, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
