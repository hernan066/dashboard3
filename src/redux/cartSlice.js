/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    shippingAddress: null,
    shippingCost: 0,
    subTotal: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];

      /*  const sub = state.products.reduce((acc, cur) => {
        return acc + cur.combo_price;
      }, 0);

      state.subTotal = sub; */
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
      /*  state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.combo_price;
      }, 0); */
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            finalPrice: action.payload.finalPrice,
            finalQuantity: action.payload.finalQuantity,
          };
        } else {
          return product;
        }
      });

      /*  state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.combo_price;
      }, 0); */
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload.shippingAddress;
      state.shippingCost = action.payload.shippingCost;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct, addShippingAddress } = cartSlice.actions;
export default cartSlice.reducer;
