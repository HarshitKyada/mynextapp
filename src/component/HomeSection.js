"use client";
import { setSpinner } from "@/features/auth/authSlice";
import Card from "@/ui/Card";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const HomeSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setSpinner(true));
      try {
        const allData = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_URL}/allproduct`
        );
        if (allData?.data?.products?.length > 0) {
          setAllData(allData.data.products);
          dispatch(setSpinner(false));
        }
      } catch (error) {
        dispatch(setSpinner(false));
        const errorMessage =
          error.response?.data?.error || "Login failed. Please try again.";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-center items-center gap-8 flex-wrap w-full">
        {allData?.length > 0 &&
          allData?.map((value, index) => {
            return (
              <div className="basis-[32.1%]" key={index}>
                <Card value={value} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomeSection;
