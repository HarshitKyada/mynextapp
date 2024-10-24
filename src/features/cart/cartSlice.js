import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemInCart: 0,
  cartApiCall: false,
  allCartItems: null,
};

const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    setItemInCart: (state, action) => {
      state.itemInCart = action.payload;
    },
    setCartApiCall: (state, action) => {
      state.cartApiCall = action.payload;
    },
    setAllCartItems: (state, action) => {
      state.allCartItems = action.payload;
    },
  },
});

export const { setItemInCart, setCartApiCall, setAllCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
