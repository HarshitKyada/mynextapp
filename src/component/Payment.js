// "use client";
// import { useEffect, useState, useRef } from "react";
// import Modal from "react-modal";
// import html2pdf from "html2pdf.js";
// import { setSpinner } from "@/features/auth/authSlice";
// import { setBillData } from "@/features/checkout/checkoutSlice";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// const Payment = () => {
//   const dispatch = useDispatch();
//   const { billData } = useSelector((state) => state?.checkout);
//   const router = useRouter();

//   const [isPreviewOpen, setPreviewOpen] = useState(false);
//   const pdfRef = useRef();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       Modal.setAppElement(document.body);
//     }
//   }, []);

//   const handlePay = async (value) => {
//     const apiBody = {
//       id: value?._id,
//       token: localStorage.getItem("authToken"),
//       email: value?.email,
//     };
//     dispatch(setSpinner(true));
//     try {
//       const apiCalled = await axios.post(
//         `${process.env.NEXT_PUBLIC_BE_URL}/successpayment`,
//         apiBody
//       );

//       if (apiCalled?.data?.success) {
//         router.push("/");
//         dispatch(setSpinner(false));
//       }
//     } catch (err) {
//       dispatch(setSpinner(false));
//     }
//   };

//   const handleCancel = async () => {
//     const apiToken = localStorage.getItem("authToken");
//     dispatch(setSpinner(true));
//     try {
//       const apiCalled = await axios.delete(
//         `${process.env.NEXT_PUBLIC_BE_URL}/cancelbill`,
//         {
//           headers: {
//             token: apiToken,
//           },
//         }
//       );

//       if (apiCalled?.data?.success) {
//         router.push("/");
//         dispatch(setSpinner(false));
//       }
//     } catch (err) {
//       dispatch(setSpinner(false));
//     }
//   };

//   const openPreview = () => setPreviewOpen(true);
//   const closePreview = () => setPreviewOpen(false);

//   const handleDownloadPDF = () => {
//     // Generate PDF from the content within `pdfRef`
//     html2pdf(pdfRef.current, {
//       margin: 1,
//       filename: "invoice.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(setSpinner(true));
//       try {
//         const apiCall = await axios.get(
//           `${process.env.NEXT_PUBLIC_BE_URL}/showingbill`,
//           {
//             headers: {
//               token: localStorage.getItem("authToken"),
//             },
//           }
//         );
//         if (apiCall?.data?.success) {
//           dispatch(setBillData(apiCall?.data?.data));
//           dispatch(setSpinner(false));
//         }
//       } catch (err) {
//         dispatch(setSpinner(false));
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {billData && Object?.keys(billData)?.length > 0 && (
//         <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold mb-4">Invoice</h1>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Customer Information</h2>
//             <p>Username: {billData?.address?.username}</p>
//             <p>Phone Number: {billData.address.phonenumber}</p>
//             <p>City: {billData.address.city}</p>
//             <p>State: {billData.address.state}</p>
//             <p>Pincode: {billData.address.pincode}</p>
//             <p>Full Address: {billData.address.fulladdress}</p>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Products</h2>
//             <ul>
//               {billData.product.map((item) => (
//                 <li key={item._id} className="flex justify-between py-1">
//                   <span>
//                     {item.productName} * {item.productcount}
//                   </span>
//                   <span>${item.productPrice.toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Summary</h2>
//             <p>Subtotal: ${billData.totalPrice.toFixed(2)}</p>
//             <p>GST: ${billData.gst.toFixed(2)}</p>
//             <p>Shipping Charge: ${billData.shippingCharge.toFixed(2)}</p>
//             <p className="font-bold">
//               Total Bill: ${billData.totalBill.toFixed(2)}
//             </p>
//           </div>
//           <button
//             className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
//             onClick={openPreview}
//           >
//             Preview Invoice
//           </button>
//           <button
//             className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
//             onClick={() => handlePay(billData)}
//           >
//             Pay Now
//           </button>
//           <button
//             className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
//             onClick={() => handleCancel()}
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Modal for PDF Preview */}
//       <Modal
//         isOpen={isPreviewOpen}
//         onRequestClose={closePreview}
//         contentLabel="Invoice Preview"
//         className="modal bg-white p-8 rounded-lg max-w-lg mx-auto"
//         overlayClassName="overlay bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         <div ref={pdfRef}>
//           <h1 className="text-2xl font-bold mb-4">Invoice Preview</h1>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Customer Information</h2>
//             <p>Username: {billData?.address?.username}</p>
//             <p>Phone Number: {billData?.address?.phonenumber}</p>
//             <p>City: {billData?.address?.city}</p>
//             <p>State: {billData?.address?.state}</p>
//             <p>Pincode: {billData?.address?.pincode}</p>
//             <p>Full Address: {billData?.address?.fulladdress}</p>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Products</h2>
//             <ul>
//               {billData?.product?.map((item) => (
//                 <li key={item._id} className="flex justify-between py-1">
//                   <span>
//                     {item.productName} * {item.productcount}
//                   </span>
//                   <span>${item.productPrice.toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Summary</h2>
//             <p>Subtotal: ${billData?.totalPrice?.toFixed(2)}</p>
//             <p>GST: ${billData?.gst?.toFixed(2)}</p>
//             <p>Shipping Charge: ${billData?.shippingCharge?.toFixed(2)}</p>
//             <p className="font-bold">
//               Total Bill: ${billData?.totalBill?.toFixed(2)}
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={handleDownloadPDF}
//           className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
//         >
//           Download PDF
//         </button>
//         <button
//           onClick={closePreview}
//           className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
//         >
//           Close Preview
//         </button>
//       </Modal>
//     </>
//   );
// };

// export default Payment;
"use client";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { setSpinner } from "@/features/auth/authSlice";
import { setBillData } from "@/features/checkout/checkoutSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();
  const { billData } = useSelector((state) => state?.checkout);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setSpinner(true));
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
          dispatch(setSpinner(false));
        }
      } catch (err) {
        dispatch(setSpinner(false));
      }
    };

    fetchData();
  }, []);

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
    const apiToken = localStorage.getItem("authToken");
    dispatch(setSpinner(true));
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
        router.push("/");
        dispatch(setSpinner(false));
      }
    } catch (err) {
      dispatch(setSpinner(false));
    }
  };

  const openPreviewInNewTab = () => {
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

    const pdf = html2pdf()
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
