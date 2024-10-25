"use client";
import React from "react";
import MainLayout from "./MainLayout";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "@/store";

const AuthLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <MainLayout>{children}</MainLayout>
      </SnackbarProvider>
    </Provider>
  );
};

export default AuthLayout;
