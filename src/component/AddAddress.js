"use client";
import React, { useEffect, useState } from "react";
import Input from "@/ui/Input";
import { validateRegistration } from "@/utils/validation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; // Added useDispatch
import { useParams, useRouter } from "next/navigation";
import { setApiCall, setEditAddress } from "@/features/address/addressSlice";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
    pincode: "",
    state: "",
    address: "",
  });

  const router = useRouter();
  const dispatch = useDispatch(); // Importing dispatch
  const [errors, setErrors] = useState({});
  const { editAddress, getApiCall } = useSelector((state) => state?.address);
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(formData);
    console.log("validationErrors", validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const apiBody = {
        username: formData?.username,
        phonenumber: formData?.phone,
        city: formData?.city,
        pincode: formData?.pincode,
        state: formData?.state,
        fulladdress: formData?.address,
        token: localStorage.getItem("authToken"),
      };
      console.log("params?.addressId", params?.addressId);
      try {
        if (params?.addressId) {
          console.log("first", apiBody);
          // Editing an address
          await axios.put(
            `http://localhost:5000/items/editaddress/${params?.addressId}`,
            apiBody
          );
        } else {
          // Adding a new address
          await axios.post(
            "http://localhost:5000/items/addnewaddress",
            apiBody
          );
        }
        router.push("/addresses"); // Redirect after success
      } catch (err) {
        console.error("Error:", err);
      }
      dispatch(setApiCall(!getApiCall));
      router.push("/address");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const apiCall = await axios.get(
          `http://localhost:5000/items/getalladdress/${params?.addressId}`,
          {
            headers: {
              token: authToken,
            },
          }
        );

        if (apiCall?.data?.success === true) {
          const allData = apiCall?.data?.address || {};
          dispatch(setEditAddress(allData));
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    if (params?.addressId && editAddress === null) {
      fetchData();
    }

    setFormData({
      username: editAddress?.username || "",
      phone: editAddress?.phonenumber || "",
      city: editAddress?.city || "",
      pincode: editAddress?.pincode || "",
      state: editAddress?.state || "",
      address: editAddress?.fulladdress || "",
    });
  }, [editAddress]);

  return (
    <div className="h-auto min-h-screen w-full flex justify-center items-center">
      <div className="bg-gray-900 px-[5%] py-[2%] min-w-[300px] rounded-xl">
        <div className="text-[32px] font-bold font-inter tracking-wide text-center mb-8">
          {params?.addressId ? "Edit Address" : "Add New Address"}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 w-full justify-between items-center flex-wrap md:flex-nowrap">
            <div className="h-24 w-[48%]">
              <p className="text-sm font-inter mb-1">User Full Name*</p>
              <Input
                type="text"
                name="username"
                placeholder="Enter your full name"
                className="w-full"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />
            </div>
            <div className="h-24 w-[48%]">
              <p className="text-sm font-inter mb-1">Phone number*</p>
              <Input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </div>

          <div className="h-24">
            <p className="text-sm font-inter mb-1">City*</p>
            <Input
              type="text"
              name="city"
              placeholder="Enter your city"
              className="w-full"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
          </div>
          <div className="flex gap-2 w-full justify-between items-center flex-wrap md:flex-nowrap">
            <div className="h-24 w-[48%]">
              <p className="text-sm font-inter mb-1">Pincode*</p>
              <Input
                type="text"
                name="pincode"
                placeholder="Enter your pincode"
                className="w-full"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
              />
            </div>
            <div className="h-24 w-[48%]">
              <p className="text-sm font-inter mb-1">State*</p>
              <Input
                type="text"
                name="state"
                placeholder="Enter your state"
                className="w-full"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              />
            </div>
          </div>
          <div className="h-24 w-full">
            <p className="text-sm font-inter mb-1">Full address*</p>
            <Input
              type="text"
              name="address"
              placeholder="Enter your full address"
              className="w-full"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          <button
            type="submit"
            className="mt-8 bg-blue-600 text-white p-2 h-[48px] w-full rounded-md"
          >
            {params?.addressId ? "Update Address" : "Add New Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
