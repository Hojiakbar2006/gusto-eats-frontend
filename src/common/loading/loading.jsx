import { LinearProgress } from "@mui/material";
import React from "react";
import "./loading.css";
import { useSelector } from "react-redux";

export default function Loading() {
  const isLoading = useSelector((state) => state.loading);
  if (isLoading) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }
  return null;
}
