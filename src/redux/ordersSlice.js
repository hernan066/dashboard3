/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    originalStock: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    addStock: (state, action) => {
      state.originalStock = action.payload;
    },
    updateOrder: (state, action) => {
      const orderItems = state.order.orderItems.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            totalPrice: +action.payload.totalPrice,
            totalQuantity: +action.payload.totalQuantity,
            unitPrice: +action.payload.unitPrice,
            unitCost: +action.payload.unitCost,
          };
        } else {
          return product;
        }
      });
      state.order = { ...state.order, orderItems };

      state.order.subTotal = state.order.orderItems.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      state.order.total = state.order.subTotal + state.order.tax;
    },
    updateStock: (state, action) => {
      state.originalStock = state.originalStock.map((item) => {
        if (item.stockId === action.payload.stockId) {
          return {
            ...item,
            newQuantity: +action.payload.newQuantity,
          };
        } else {
          return item;
        }
      });
    },
    deleteProductOrder: (state, action) => {
      const orderItems = state.order.orderItems.filter((product) => action.payload !== product._id);

      state.order = { ...state.order, orderItems };

      state.order.subTotal = state.order.orderItems.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      state.order.total = state.order.subTotal + state.order.tax;
      state.order.numberOfItems = state.order.orderItems.length;
    },
  },
});

export const { addOrder, updateOrder, deleteProductOrder, addStock, updateStock } =
  orderSlice.actions;
export default orderSlice.reducer;
