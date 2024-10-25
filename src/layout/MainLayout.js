"use client";
import React from "react";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Spinner from "@/ui/Spinner";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSpinner } from "@/features/auth/authSlice";

const MainLayout = ({ children }) => {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { isSpinnerShow } = useSelector((state) => state.auth);
  const [isAuthPath, setIsAuthPath] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authPaths = ["login", "signup", "forgotpassword"];
      setIsAuthPath(authPaths.some((path) => pathName.includes(path)));
      dispatch(setSpinner(true));
      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/sync`, {
            token: authToken,
          });
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setTimeout(() => {
          dispatch(setSpinner(false)); // Set loading to false after data is fetched
        }, 300);
      }
    };

    fetchData(); // Call the async function

    return () => {
      dispatch(setSpinner(false));
    };
  }, [pathName]);

  return (
    <>
      {isAuthPath ? (
        <div>{children}</div>
      ) : (
        <Spinner isShow={isSpinnerShow}>
          <div className="relative">
            <Header />
            <div className="px-[3%] min-h-[66vh]">{children}</div>
            <Footer />
          </div>
        </Spinner>
      )}
    </>
  );
};

export default MainLayout;
