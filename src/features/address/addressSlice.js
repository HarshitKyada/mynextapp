import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: null,
  selectAddress: null,
  getApiCall: false,
  editAddress: null,
};

const addressSlice = createSlice({
  name: "addressReducer",
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    setSelectAddress: (state, action) => {
      state.selectAddress = action.payload;
    },
    setApiCall: (state, action) => {
      state.getApiCall = action.payload;
    },
    setEditAddress: (state, action) => {
      state.editAddress = action.payload;
    },
  },
});

export const { setAddressList, setSelectAddress, setApiCall, setEditAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
