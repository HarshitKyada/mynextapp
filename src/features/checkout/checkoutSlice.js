import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billData: null,
};

const checkoutSlice = createSlice({
  name: "checkoutReducer",
  initialState,
  reducers: {
    setBillData: (state, action) => {
      state.billData = action.payload;
    },
  },
});

export const { setBillData } = checkoutSlice.actions;

export default checkoutSlice.reducer;
