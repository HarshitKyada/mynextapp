"use client";

import Card from "@/ui/Card";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const ViewProduct = () => {
  const [alldata, setData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const productId = params?.productId;

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;

      try {
        const response = await axios.post(
          `http://localhost:5000/items/viewproduct`,
          {
            id: productId,
          }
        );
        if (response?.data?.success) {
          setData(response?.data?.product);
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
