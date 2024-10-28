"use client";
import React, { useState } from "react";
import Input from "@/ui/Input"; // Ensure this path is correct
import { validateRegistration } from "@/utils/validation"; // Import the validation utility
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSnackbar } from "notistack";
import { setSpinner } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const route = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(setSpinner(true));
      const isApiCalled = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/signup`,
        {
          email: formData?.email,
          username: formData?.username,
          password: formData?.password,
        }
      );
      if (isApiCalled.data?.success) {
        route.push("/login");
        enqueueSnackbar("Register successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
        dispatch(setSpinner(false));
      }
    }
  };

  return (
    <div className="h-auto min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 px-[5%] py-[2%] w-[40%] min-w-[300px] rounded-xl">
        <div className="text-[32px] font-bold font-inter tracking-wide text-center mb-8">
          Register
        </div>
        <form onSubmit={handleSubmit}>
          <div className="h-24">
            <p className="text-sm font-inter mb-1">User Name*</p>
            <Input
              type="text"
              name="username"
              placeholder="Enter a username"
              className="w-full"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
          </div>
          <div className="h-24">
            <p className="text-sm font-inter mb-1">Email*</p>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
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
              placeholder="Enter a strong password"
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
          <div className="flex gap-3 items-center">
            <Input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <p className="text-sm font-inter">
              Accept all terms and condition*
            </p>
          </div>
          {errors.terms && (
            <p className="text-red-500 font-inter text-[12px] mt-1">
              {errors.terms}
            </p>
          )}
          <p className="text-sm font-inter mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Log in here
            </Link>
            .
          </p>
          <button
            type="submit"
            className="mt-8 bg-blue-600 text-white p-2 h-[48px] w-full rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
