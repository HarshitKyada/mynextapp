import { setSpinner } from "@/features/auth/authSlice";
import { setAllCartItems, setCartApiCall } from "@/features/cart/cartSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartCard = () => {
  const dispatch = useDispatch();
  const { cartApiCall, allCartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  const [updatedCartItems, setUpdatedCartItems] = useState([]);

  useEffect(() => {
    if (allCartItems?.length > 0) {
      // Check if the count is already set to avoid unnecessary updates
      const itemsWithUpdatedCount = allCartItems.map((item) =>
        item.count !== undefined ? item : { ...item, count: 1 }
      );

      // Only update if there are changes (to prevent infinite loop)
      const hasChanges = allCartItems.some(
        (item, index) => item.count !== itemsWithUpdatedCount[index].count
      );

      if (hasChanges) {
        setUpdatedCartItems(itemsWithUpdatedCount); // Update local state
        dispatch(setAllCartItems(itemsWithUpdatedCount)); // Update Redux state
      } else {
        setUpdatedCartItems(allCartItems); // Sync with Redux state
      }
    }
  }, [allCartItems, dispatch]);

  const removeFromCart = async (value) => {
    const id = value?._id;
    const authToken = localStorage?.getItem("authToken");
    dispatch(setSpinner(true));
    try {
      const apiCalled = await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/removefromcart/${id}`,
        {
          headers: {
            token: authToken,
          },
        }
      );
      if (apiCalled) {
        dispatch(setCartApiCall(!cartApiCall));
        dispatch(setSpinner(false));
      }
    } catch (error) {}
  };

  const shopNow = async (value) => {
    const apiBody = {
      name: value?.name,
      description: value?.description,
      price: value?.price,
      count: value?.count,
      token: localStorage?.getItem("authToken"),
    };
    dispatch(setSpinner(true));
    try {
      const apiCall = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/shopnow`,
        apiBody
      );
      if (apiCall?.data?.success === true) {
        removeFromCart(value);
        router.push("/address");
        dispatch(setSpinner(false));
      }
    } catch (err) {}
  };

  const handleDelete = (index) => {
    const updatedItems = [...updatedCartItems];
    if (updatedItems[index].count > 1) {
      updatedItems[index].count -= 1;
      setUpdatedCartItems(updatedItems);
      dispatch(setAllCartItems(updatedItems)); // Sync with Redux state
    }
  };

  const handleAdd = (index) => {
    const updatedItems = [...updatedCartItems];
    updatedItems[index] = {
      ...updatedItems[index],
      count: updatedItems[index].count + 1,
    };
    setUpdatedCartItems(updatedItems);
    dispatch(setAllCartItems(updatedItems)); // Sync with Redux state
  };

  return (
    <>
      {updatedCartItems?.length > 0 ? (
        updatedCartItems?.map((value, index) => {
          return (
            <div key={index}>
              <div className="h-full w-full min-w-[350px] rounded-lg shadow bg-gray-800 border-gray-700 p-[2%]">
                <div>
                  <Image
                    className="p-8 rounded-t-lg"
                    src={value?.imageUrl}
                    alt="product image"
                    width={250}
                    height={250}
                  />
                </div>
                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-white">
                    {value?.name}
                  </h5>
                  <h5 className="text-xl font-semibold tracking-tight text-white">
                    {value?.description}
                  </h5>
                  <div className="flex items-center">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {/* Star Ratings */}
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-3xl font-bold text-white">
                        ${value?.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  Add more quantity
                  <div className="flex border border-gray-300 rounded p-2 items-center gap-2 w-28 justify-center">
                    <button onClick={() => handleDelete(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.83333 10C4.83333 9.44772 5.28104 9 5.83333 9H14.1667C14.7189 9 15.1667 9.44772 15.1667 10C15.1667 10.5523 14.7189 11 14.1667 11H5.83333C5.28104 11 4.83333 10.5523 4.83333 10Z"
                          fill="#fff"
                        />
                      </svg>
                    </button>
                    {value.count}
                    <button onClick={() => handleAdd(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11 5.83337C11 5.28109 10.5523 4.83337 9.99999 4.83337C9.44771 4.83337 8.99999 5.28109 8.99999 5.83337V9.00004H5.83333C5.28104 9.00004 4.83333 9.44776 4.83333 10C4.83333 10.5523 5.28104 11 5.83333 11H8.99999V14.1667C8.99999 14.719 9.44771 15.1667 9.99999 15.1667C10.5523 15.1667 11 14.719 11 14.1667V11H14.1667C14.7189 11 15.1667 10.5523 15.1667 10C15.1667 9.44776 14.7189 9.00004 14.1667 9.00004H11V5.83337Z"
                          fill="#fff"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap">
                  <button
                    onClick={() => shopNow(value)}
                    className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => removeFromCart(value)}
                    className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-200 text-blue-800"
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default CartCard;
