import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    userName: "User Name",
    cartItems: []
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    addCartItem: (state, {payload}) => {
      const prductIndex = state.cartItems.findIndex(item => item.id === payload.id);
      if (prductIndex !== -1) {
        state.cartItems[prductIndex].count += 1;
      }
      else state.cartItems.push({id: payload.id, count: 1, product: payload});
    },
    removeCartItem: (state, {payload}) => {
      const prductIndex = state.cartItems.findIndex(item => item.id === payload.id);
      if (prductIndex !== -1) {
        if (state.cartItems[prductIndex].count === 1) {
          state.cartItems.splice(prductIndex, 1);
        } else state.cartItems[prductIndex].count -= 1;
      }
    },
    clearCart: state => {
      state.cartItems = [];
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
