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
    receiptId: null,
    validStockQuantity: true,
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
      state.receiptId = Date.now();
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
            basePrice: +action.payload.basePrice,
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
    isValidStockOrder: (state, action) => {
      state.validStockQuantity = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.shippingAddress = null;
      state.client = null;
      state.shippingCost = 0;
      state.subTotal = 0;
      state.receiptId = null;
      state.validStockQuantity = true;
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
  isValidStockOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
