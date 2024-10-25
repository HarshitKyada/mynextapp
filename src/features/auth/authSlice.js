import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSpinnerShow: false
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setSpinner: (state, action) => {
      state.isSpinnerShow = action.payload;
    },
  },
});

export const { setSpinner } = authSlice.actions;

export default authSlice.reducer;
