"use client";
import { setBillData } from "@/features/checkout/checkoutSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();
  const { billData } = useSelector((state) => state?.checkout);
  const router = useRouter();

  const handlePay = async (value) => {
    const apiBody = {
      id: value?._id,
      token: localStorage.getItem("authToken"),
      email: value?.email,
    };
    try {
      const apiCalled = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/successpayment`,
        apiBody
      );

      if (apiCalled?.data?.success) {
        console.log("apiCalled?.data", apiCalled?.data);
        router.push("/");
      }
    } catch (err) {}
  };
  const handleCancel = async () => {
    const apiToken = localStorage.getItem("authToken");
    try {
      const apiCalled = await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/cancelbill`,
        {
          headers: {
            token: apiToken,
          },
        }
      );

      if (apiCalled?.data?.success) {
        console.log("apiCalled?.data", apiCalled?.data);
        router.push("/");
      }
    } catch (err) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCall = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_URL}/showingbill`,
          {
            headers: {
              token: localStorage.getItem("authToken"),
            },
          }
        );
        if (apiCall?.data?.success) {
          dispatch(setBillData(apiCall?.data?.data));
        }
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <>
      {billData && Object?.keys(billData)?.length > 0 && (
        <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Invoice</h1>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Customer Information</h2>
            <p>Username: {billData.address.username}</p>
            <p>Phone Number: {billData.address.phonenumber}</p>
            <p>City: {billData.address.city}</p>
            <p>State: {billData.address.state}</p>
            <p>Pincode: {billData.address.pincode}</p>
            <p>Full Address: {billData.address.fulladdress}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <ul>
              {billData.product.map((item) => (
                <li key={item._id} className="flex justify-between py-1">
                  <span>
                    {item.productName} * {item.productcount}
                  </span>
                  <span>${item.productPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <p>Subtotal: ${billData.totalPrice.toFixed(2)}</p>
            <p>GST: ${billData.gst.toFixed(2)}</p>
            <p>Shipping Charge: ${billData.shippingCharge.toFixed(2)}</p>
            <p className="font-bold">
              Total Bill: ${billData.totalBill.toFixed(2)}
            </p>
          </div>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
            onClick={() => handlePay(billData)}
          >
            Pay Now
          </button>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default Payment;
