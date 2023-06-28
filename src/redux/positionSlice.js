/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const positionSlice = createSlice({
  name: "deliveriesPositions",
  initialState: {
    positions: [],
  },
  reducers: {
    setPositions: (state, action) => {
      const filter = state.positions.filter(
        (delivery) => delivery.truckId !== action.payload.truckId
      );

      state.positions = [...filter, action.payload];
    },
  },
});

export const { setPositions } = positionSlice.actions;
export default positionSlice.reducer;
