"use client";
import React, { useState } from "react";
import Input from "@/ui/Input";
import { validateRegistration } from "@/utils/validation";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
    //   console.log("formData", formData?.email);
    }
  };

  return (
    <div className="h-auto min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 px-[5%] py-[2%] w-[40%] min-w-[300px] rounded-xl">
        <div className="text-[32px] font-bold font-inter tracking-wide text-center mb-8">
          Forgot Password
        </div>
        <form onSubmit={handleSubmit}>
          <div className="h-24">
            <p className="text-sm font-inter mb-1">Email*</p>
            <Input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              className="w-full"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <p className="text-sm font-inter mt-4 text-center">
            We send mail on or registered email
          </p>
          <button
            type="submit"
            className="mt-8 bg-blue-600 text-white p-2 h-[48px] w-full rounded-md"
          >
            Send mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
