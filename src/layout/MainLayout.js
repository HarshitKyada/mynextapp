"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../store/index";

const Footer = dynamic(() => import("@/component/Footer"));
const Header = dynamic(() => import("@/component/Header"));

const MainLayout = ({ children }) => {
  const pathName = usePathname();
  const [isAuthPath, setIsAuthPath] = useState(false);
  const [isPageLoad, setIsPageLoad] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const authPaths = ["login", "signup", "forgotpassword"];
      setIsAuthPath(authPaths.some((path) => pathName.includes(path)));
      setTimeout(() => {
        setIsPageLoad(true);
      }, 300);

      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          await axios.post("http://localhost:5000/items/sync", {
            token: authToken, // Use the token from localStorage
          });
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData(); // Call the async function

    return () => {
      setIsPageLoad(false);
    };
  }, [pathName]);

  // if (!isPageLoad) return null;

  return (
    <>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          maxSnack={3}
        >
          {isAuthPath ? (
            <div>{children}</div>
          ) : (
            <div>
              <Header />
              <div className="px-[3%]">{children}</div>
              <Footer />
            </div>
          )}
        </SnackbarProvider>
      </Provider>
    </>
  );
};
export default MainLayout;
