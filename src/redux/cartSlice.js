/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    client: null,
    shippingAddress: null,
    shippingCost: 0,
    subTotal: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];

      const sub = state.products.reduce((acc, cur) => {
        return acc + cur.finalPrice;
      }, 0);

      state.subTotal = sub;
    },
    addClient: (state, action) => {
      state.client = action.payload;
    },
    clearClient: (state) => {
      state.client = null;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.finalPrice;
      }, 0);
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            finalPrice: +action.payload.finalPrice,
            finalQuantity: +action.payload.finalQuantity,
          };
        } else {
          return product;
        }
      });

      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.finalPrice;
      }, 0);
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload.shippingAddress;
      state.shippingCost = action.payload.shippingCost;
    },
    clearCart: (state) => {
      state.products = [];
      state.shippingAddress = null;
      state.client = null;
      state.shippingCost = 0;
      state.subTotal = 0;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  addShippingAddress,
  clearCart,
  addClient,
  clearClient,
} = cartSlice.actions;
export default cartSlice.reducer;
