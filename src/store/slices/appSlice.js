import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    userName: "User Name",
    cartItems: [],
    products: {
      loader: true,
      error: null,
      data: []
    },
    filter: {
      searchText: "",
      data: []
    }
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    addCartItem: (state, { payload }) => {
      const prductIndex = state.cartItems.findIndex(item => item.id === payload.id);
      if (prductIndex !== -1) {
        state.cartItems[prductIndex].count += 1;
      }
      else state.cartItems.push({ id: payload.id, count: 1, product: payload });
    },
    removeCartItem: (state, { payload }) => {
      if (Number.isInteger(payload) === true) {
        const prductIndex = state.cartItems.findIndex(item => item.id === payload);
        state.cartItems.splice(prductIndex, 1);
      }
      else {
        const prductIndex = state.cartItems.findIndex(item => item.id === payload.id);
        if (prductIndex !== -1) {
          if (state.cartItems[prductIndex].count === 1) {
            state.cartItems.splice(prductIndex, 1);

          } else state.cartItems[prductIndex].count -= 1;
        }
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
    setProductLoader: state => {
      state.products = {
        loader: true,
        error: null,
        data: []
      }
    },
    setProductError: (state, { payload }) => {
      state.products = { loader: false, error: payload, data: [] };
    },
    setProductData: (state, { payload }) => {
      const searchValue = state.filter.searchText.toLowerCase();
      state.products = { loader: false, error: null, data: payload };
      state.filter.data = searchValue === ""
        ? payload
        : payload.filter(item => item.title.toLowerCase().includes(searchValue));;
    },
    filterBySearch: (state, { payload }) => {
      const searchValue = payload.toLowerCase();
      const data = state.products.data
        .filter(item => item.title.toLowerCase().includes(searchValue));
      state.filter = {
        ...state.filter,
        searchText: payload,
        data
      };
    }
  }
});

export const actions = slice.actions;

export default slice.reducer;
