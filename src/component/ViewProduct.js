"use client";

import { setSpinner } from "@/features/auth/authSlice";
import Card from "@/ui/Card";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ViewProduct = () => {
  const [alldata, setData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const productId = params?.productId;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;
      dispatch(setSpinner(true));
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BE_URL}/viewproduct`,
          {
            id: productId,
          }
        );
        if (response?.data?.success) {
          setData(response?.data?.product);
          dispatch(setSpinner(false));
        } else {
          enqueueSnackbar("Failed to fetch product data.", {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "Failed to fetch product data.";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    };

    fetchData();
  }, [productId, enqueueSnackbar]);

  return <div>{alldata && <Card value={alldata} />}</div>;
};

export default ViewProduct;
