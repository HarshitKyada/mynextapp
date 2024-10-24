"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import axios from "axios";
import { setCartApiCall } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ value }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state?.cart);
  const { cartApiCall } = storeData;
  const addToCart = async (value) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const apiBody = {
        id: value?.id,
        name: value?.name,
        description: value?.description,
        price: value?.price,
        rating: value?.rating,
        imageUrl: value?.imageUrl,
        token: authToken,
      };
      const apiCalled = await axios.post(
        "http://localhost:5000/items/addtocart",
        apiBody
      );
      if (apiCalled?.data?.success) {
        dispatch(setCartApiCall(!cartApiCall));
        enqueueSnackbar("Item added successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      }
    } catch (error) {
      const errorMessage = error?.response?.status;
      if (errorMessage === 401) {
        // router.push("/login")
      }
      // enqueueSnackbar(errorMessage, {
      //   variant: "error",
      //   autoHideDuration: 3000,
      // });
    }
  };
  const viewProduct = (value) => {
    router.push(`${value?._id}/product`);
  };
  return (
    <div class="h-full min-h-[450px] min-w-[350px] rounded-lg shadow bg-gray-800 border-gray-700">
      <div onClick={viewProduct}>
        <Image
          className="p-8 rounded-t-lg"
          src={value?.imageUrl}
          alt="product image"
          width={250} // Add the required width
          height={250} // Add the required height
        />
      </div>
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-white">
            {value?.name?.length > 10
              ? `${value.name.slice(0, 10)}...`
              : value?.name}
          </h5>
        </a>
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-white">
            {value?.description?.length > 40
              ? `${value.description.slice(0, 40)}...`
              : value?.description}
          </h5>
        </a>
        <div class="flex items-center">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <div className="flex justify-between items-center w-full">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-3">
              {value?.rating}
            </span>
            <span class="text-3xl font-bold text-white">${value?.price}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between flex-wrap">
        <button
          onClick={() => addToCart(value)}
          class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Add to cart
        </button>
        <button
          onClick={() => viewProduct(value)}
          class="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-200 text-blue-800"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Card;
