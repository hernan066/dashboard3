/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    updateOrder: (state, action) => {
      const orderItems = state.order.orderItems.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            totalPrice: +action.payload.totalPrice,
            totalQuantity: +action.payload.totalQuantity,
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
    deleteProductOrder: (state, action) => {
      const orderItems = state.order.orderItems.filter((product) => action.payload !== product._id);
      // console.log(orderItems);
      // 63ecf096c6184b49ea723ee2
      // 63ecf096c6184b49ea723ee2
      state.order = { ...state.order, orderItems };

      state.order.subTotal = state.order.orderItems.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      state.order.total = state.order.subTotal + state.order.tax;
      state.order.numberOfItems = state.order.orderItems.length;
    },
  },
});

export const { addOrder, updateOrder, deleteProductOrder } = orderSlice.actions;
export default orderSlice.reducer;
