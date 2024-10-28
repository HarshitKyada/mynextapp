"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { setSpinner } from "@/features/auth/authSlice";
import { setBillData } from "@/features/checkout/checkoutSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

// Dynamically import html2pdf to load it only on the client side
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

const Payment = () => {
  const dispatch = useDispatch();
  const { billData } = useSelector((state) => state?.checkout);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window === "undefined") return;

      dispatch(setSpinner(true));
      try {
        const token = localStorage.getItem("authToken");
        const apiCall = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_URL}/showingbill`,
          {
            headers: { token },
          }
        );
        if (apiCall?.data?.success) {
          dispatch(setBillData(apiCall?.data?.data));
          dispatch(setSpinner(false));
        }
      } catch (err) {
        dispatch(setSpinner(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePay = async (value) => {
    const apiBody = {
      id: value?._id,
      token: localStorage.getItem("authToken"),
      email: value?.email,
    };
    dispatch(setSpinner(true));
    try {
      const apiCalled = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/successpayment`,
        apiBody
      );
      if (apiCalled?.data?.success) {
        router.push("/");
        dispatch(setSpinner(false));
      }
    } catch (err) {
      dispatch(setSpinner(false));
    }
  };

  const handleCancel = async () => {
    const token = localStorage.getItem("authToken");
    dispatch(setSpinner(true));
    try {
      const apiCalled = await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/cancelbill`,
        {
          headers: { token },
        }
      );
      if (apiCalled?.data?.success) {
        router.push("/");
        dispatch(setSpinner(false));
      }
    } catch (err) {
      dispatch(setSpinner(false));
    }
  };

  const openPreviewInNewTab = () => {
    if (!html2pdf || typeof window === "undefined") return;

    const element = document.createElement("div");
    element.id = "pdf-content";
    document.body.appendChild(element);

    const content = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #000">
        <h1 style="text-align: center;">Invoice Preview</h1>
        <h2>Customer Information</h2>
        <p>Username: ${billData.address.username}</p>
        <p>Phone Number: ${billData.address.phonenumber}</p>
        <p>City: ${billData.address.city}</p>
        <p>State: ${billData.address.state}</p>
        <p>Pincode: ${billData.address.pincode}</p>
        <p>Full Address: ${billData.address.fulladdress}</p>
        <h2>Products</h2>
        <ul>
          ${billData.product
            .map(
              (item) => `
              <li>
                ${item.productName} * ${
                item.productcount
              } - $${item.productPrice.toFixed(2)}
              </li>
            `
            )
            .join("")}
        </ul>
        <h2>Summary</h2>
        <p>Subtotal: $${billData.totalPrice.toFixed(2)}</p>
        <p>GST: $${billData.gst.toFixed(2)}</p>
        <p>Shipping Charge: $${billData.shippingCharge.toFixed(2)}</p>
        <h2>Total Bill: $${billData.totalBill.toFixed(2)}</h2>
      </div>
    `;

    element.innerHTML = content;

    html2pdf()
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const blob = pdf.output("blob");
        const newTab = window.open();
        const url = URL.createObjectURL(blob);
        newTab.location.href = url;
        setTimeout(() => URL.revokeObjectURL(url), 100); // Clean up the URL object
      });

    document.body.removeChild(element);
  };

  return (
    <>
      {billData && Object.keys(billData).length > 0 && (
        <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          {/* Rest of the component rendering */}
          <button
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
            onClick={openPreviewInNewTab}
          >
            Preview Invoice
          </button>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
            onClick={() => handlePay(billData)}
          >
            Pay Now
          </button>
          <button
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default Payment;
