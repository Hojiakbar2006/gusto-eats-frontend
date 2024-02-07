import React, { useState } from "react";
import "./style.css";
import { RouteNav } from "../../components";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCreateCategoryMutation } from "../../../app/api/endpoints/forAdmin";

export default function CategoryAdd() {
  const [uploadCategory, { isLoading }] = useCreateCategoryMutation();
  const [img, setImg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const response = await uploadCategory(data);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"back"} pageName={"Category"} />
      <form
        onSubmit={handleSubmit}
        className="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <TextField
          required
          fullWidth
          id="name"
          label="Category Name"
          name="name"
          autoComplete="off"
          autoFocus
        />
        <label>
          <input
            name="image"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          {img ? img.name : <span>Category Image</span>}
        </label>
        <LoadingButton
          type="submit"
          fullWidth
          sx={{ height: "50px", bgcolor: "#0b5dd6" }}
          variant="contained"
          loading={isLoading}
          loadingIndicator="Loading…"
        >
          Add Product
        </LoadingButton>
      </form>
    </div>
  );
}
