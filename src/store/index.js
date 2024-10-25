// src/store/index.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import ClearPersistedStateMiddleware from "../features/middleware/ClearPersistedStateMiddleware";
import addressReducer from "../features/address/addressSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import authReducer from "../features/auth/authSlice";

// Root reducer that can handle RESET_STATE action
const appReducer = combineReducers({
  cart: cartReducer,
  address: addressReducer,
  checkout: checkoutReducer,
  auth: authReducer
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ClearPersistedStateMiddleware),
});

export default store;
