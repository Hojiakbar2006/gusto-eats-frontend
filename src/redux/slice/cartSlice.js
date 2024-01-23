import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (cartItems, total) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartState", JSON.stringify({ cartItems, total }));
};
const getCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const getCartStateFromLocalStorage = () => {
  const cartState = localStorage.getItem("cartState");
  return cartState ? JSON.parse(cartState) : { cartItems: [], total: 0 };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartStateFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.total += newItem.price;
      saveToLocalStorage(state.cartItems, state.total);
      getCartItemsFromLocalStorage();
    },

    addQty: (state, action) => {
      const addedItem = action.payload;
      const isAddQtyStockAvailable =
        addedItem.quantity + 1 <= addedItem.countInStock;

      if (isAddQtyStockAvailable) {
        const updatedCartItemsAddQty = state.cartItems.map((item) =>
          item.id === addedItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + addedItem.price,
              }
            : item
        );

        state.cartItems = updatedCartItemsAddQty;
        state.total = state.total + addedItem.price;

        saveToLocalStorage(updatedCartItemsAddQty, state.total);
      }
    },

    removeQty: (state, action) => {
      const removedQtyItem = action.payload;
      const isRemoveQtyStockAvailable = removedQtyItem.quantity - 1 >= 1;

      if (isRemoveQtyStockAvailable) {
        const updatedCartItemsRemoveQty = state.cartItems.map((item) =>
          item.id === removedQtyItem.id && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - removedQtyItem.price,
              }
            : item
        );

        state.cartItems = updatedCartItemsRemoveQty;
        state.total = state.total - removedQtyItem.price;
        saveToLocalStorage(updatedCartItemsRemoveQty, state.total);
      }
    },

    removeFromCart: (state, action) => {
      const removedItem = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== removedItem.id
      );
      const removedItemTotal = removedItem.price * removedItem.quantity;

      state.cartItems = updatedCartItems;
      state.total = state.total - removedItemTotal;

      saveToLocalStorage(updatedCartItems, state.total);
    },

    getCartItems: (state) => {
      state.cartItems = getCartItemsFromLocalStorage();
    },
  },
});

export const { addToCart, addQty, removeQty, removeFromCart, getCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
