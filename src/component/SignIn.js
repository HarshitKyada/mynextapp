"use client";
import React, { useState } from "react";
import Input from "@/ui/Input"; // Ensure this path is correct
import { validateRegistration } from "@/utils/validation"; // Import the validation utility
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const route = useRouter();
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent further execution if there are validation errors
    }

    setErrors({}); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/items/login", {
        email: formData?.email,
        password: formData?.password,
      });

      if (response.status === 200) {
        // Check if the API call was successful
        const authToken = response.data?.user?.token;
        localStorage.setItem("userLogin", true);
        localStorage.setItem("authToken", authToken);
        enqueueSnackbar("Login successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
        route.push("/"); // Uncomment if you want to redirect after login
      }
    } catch (error) {
      // Handle API errors
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div className="h-auto min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 px-[5%] py-[2%] w-[40%] min-w-[300px] rounded-xl">
        <div className="text-[32px] font-bold font-inter tracking-wide text-center mb-8">
          Login
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
          <div className="h-24">
            <p className="text-sm font-inter mb-1">Password*</p>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>
          <div className="flex gap-3 items-center mb-4">
            <Input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer"
            />
            <p className="text-sm font-inter">Show Password</p>
          </div>
          {errors.terms && (
            <p className="text-red-500 font-inter text-[12px] mt-1">
              {errors.terms}
            </p>
          )}
          <p className="text-sm font-inter mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Register here
            </Link>
            .
          </p>
          <button
            type="submit"
            className="mt-8 bg-blue-600 text-white p-2 h-[48px] w-full rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
