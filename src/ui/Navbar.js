"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import shop from "./assets/shop.svg";
import { useDispatch, useSelector } from "react-redux";
import { setAllCartItems, setItemInCart } from "@/features/cart/cartSlice";
import axios from "axios";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state?.cart);
  const { cartApiCall, itemInCart } = storeData;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleGetStarted = () => {
    if (isAuthUser) {
      router.push("/addtocart");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const allData = localStorage.getItem("userLogin") || false;
    if (allData && JSON?.parse(allData)) {
      setIsAuthUser(true);
    } else {
      setIsAuthUser(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken") || "";
      try {
        const cartApiCalled = await axios.post(
          "http://localhost:5000/items/viewcart",
          { token: authToken }
        );
        const totalItems = cartApiCalled?.data?.cart?.items?.length || 0;
        const items = cartApiCalled?.data?.cart?.items || [];
        dispatch(setItemInCart(totalItems));
        dispatch(setAllCartItems(items));
      } catch (error) {}
    };
    fetchData();
  }, [cartApiCall]);

  return (
    <>
      <nav className="bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
              width={50}
              height={30}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white font-inter">
              Flowbite
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="relative group">
              <button
                type="button"
                className="text-white font-inter focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                onClick={handleGetStarted}
              >
                {isAuthUser ? <Image src={shop} alt="shop" /> : "Get Started"}
              </button>
              {isAuthUser && (
                <div className="absolute top-[-6px] right-[-6px] text-[12px] font-inter h-5 w-5 flex justify-center items-center bg-blue-600 rounded-3xl">
                  {itemInCart && itemInCart}
                </div>
              )}
              <div className="absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-sm font-medium rounded-lg px-3 py-2 shadow-sm bottom-full mb-2">
                Tooltip on bottom
              </div>
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
              onClick={handleToggle}
            >
              <span className="sr-only font-inter">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500 font-inter"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700 font-inter"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-inter rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-inter rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
