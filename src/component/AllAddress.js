"use client";

import {
  setAddressList,
  setApiCall,
  setEditAddress,
  setSelectAddress,
} from "@/features/address/addressSlice";
import { setSpinner } from "@/features/auth/authSlice";
import CustomRadio from "@/ui/CustomRadio";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllAddress = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { addressList, selectAddress, getApiCall } = useSelector(
    (state) => state?.address
  );

  const handleChange = async (value) => {
    const authToken = localStorage.getItem("authToken");
    dispatch(setSelectAddress(value?._id));
    dispatch(setSpinner(true))
    try {
      const apiCall = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/selectaddress`,
        {
          token: authToken,
          id: value?._id,
        }
      );
      if (apiCall?.data?.success) {
        dispatch(setSpinner(false))
        router.push("/payment");
      }
    } catch (err) {
      dispatch(setSpinner(false))
    }
  };

  const handleDelete = async (value) => {
    const authToken = localStorage.getItem("authToken");
    dispatch(setSpinner(true))
    try {
      const apiCall = await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/deleteaddress/${value?._id}`,
        {
          headers: {
            token: authToken,
          },
        }
      );
      if (apiCall) {
        dispatch(setSpinner(false))
        dispatch(setApiCall(!getApiCall));
      }
    } catch (err) {
      dispatch(setSpinner(false))
    }
  };

  const handleEdit = async (value) => {
    router.push(`address/${value?._id}`);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchData = async () => {
      dispatch(setSpinner(false))
      try {
        const apiCall = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_URL}/getalladdress`,
          {
            headers: {
              token: authToken,
            },
          }
        );

        if (apiCall?.data?.success === true) {
          const allData = apiCall?.data?.addresses || [];
          dispatch(setAddressList(allData));
          dispatch(setSpinner(false))
        }
      } catch (error) {
        router.push("/login");
        dispatch(setSpinner(false))
      }
    };

    fetchData();
  }, [getApiCall]);

  return (
    <div className="w-full p-4">
      {addressList?.length > 0 ? (
        <>
          <p>Select your address please</p>
          <>
            <div className="w-full flex gap-4 flex-wrap justify-between">
              {addressList.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="w-full md:w-[48%] border rounded-lg shadow bg-gray-800 border-gray-700 p-4"
                  >
                    <div>
                      <p className="text-white mb-2">Address {index + 1}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-300 flex flex-col gap-2">
                          <p className="text-sm font-inter">
                            Name : {value?.username}
                          </p>
                          <p className="text-sm font-inter">
                            Phonenumber : {value?.phonenumber}
                          </p>
                          <p className="text-sm font-inter">
                            City : {value?.city}
                          </p>
                          <p className="text-sm font-inter">
                            State : {value?.state}
                          </p>
                          <p className="text-sm font-inter">
                            PinCode : {value?.pincode}
                          </p>
                          <p className="text-sm font-inter">
                            Address : {value?.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CustomRadio
                        checked={
                          selectAddress !== null && selectAddress === value?._id
                        }
                        onChange={() => handleChange(value)}
                      />
                      <p>Select this address</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="mt-2 bg-blue-600 text-white p-2 h-[48px] w-full rounded-md"
                        onClick={() => {
                          handleEdit(value);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="mt-2 bg-blue-600 text-white p-2 h-[48px] w-full rounded-md"
                        onClick={() => {
                          handleDelete(value);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="text-white">No addresses found.</p>
        </div>
      )}
      <button
        className="mt-8 bg-blue-600 text-white p-2 h-[48px] w-44 rounded-md"
        onClick={() => {
          router.push("/address/addaddress");
          dispatch(setEditAddress(null));
        }}
      >
        Add new one
      </button>
    </div>
  );
};

export default AllAddress;
