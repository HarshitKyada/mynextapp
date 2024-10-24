"use client";
import Card from "@/ui/Card";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";


const HomeSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await axios.get(
          "http://localhost:5000/items/allproduct"
        );
        if (allData?.data?.products?.length > 0) {
          setAllData(allData.data.products);
        }
      } catch (error) {
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
