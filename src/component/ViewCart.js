"use client";

import { setCartApiCall } from "@/features/cart/cartSlice";
import CartCard from "@/ui/CartCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewCart = () => {
  const { allCartItems, cartApiCall } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const shopNowAll = async () => {
    let allItem = allCartItems || [];
    const apiBody = {
      items: [
        ...allItem?.map((value) => {
          return {
            name: value?.name,
            description: value?.description,
            price: value?.price,
            count: value?.count
          };
        }),
      ],
      token: localStorage.getItem("authToken"),
    };

    try {
      const apiCalled = await axios.post(
        "http://localhost:5000/items/shopallnow",
        apiBody
      );
      if (apiCalled?.data?.success === true) {
        dispatch(setCartApiCall(!cartApiCall));
        router.push("/address");
      }
    } catch (err) {}
  };
  useEffect(() => {
    if (allCartItems === null) {
      dispatch(setCartApiCall(!cartApiCall));
    }
  }, [allCartItems]);
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3">
        <CartCard />
      </div>
      <button
        onClick={() => shopNowAll()}
        class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        Shop All Now
      </button>
    </div>
  );
};

export default ViewCart;
