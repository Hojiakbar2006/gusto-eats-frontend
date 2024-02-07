import React, { useState } from "react";
import "./style.css";
import { RouteNav } from "../../components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../../app/api/endpoints/product";
import { LoadingButton } from "@mui/lab";
import { useCreateProductMutation } from "../../../app/api/endpoints/forAdmin";

export default function ProductAdd() {
  const { data: categoriesData = [] } = useGetCategoriesQuery();
  const [img, setImg] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: product } = useGetProductsQuery();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Or any other duration you prefer
  };

  const [uploadProduct, { isLoading }] = useCreateProductMutation();
  const filteredProducts = product.products.filter(
    (item) => item.category === selectedCategory
  );
  const types = [...new Set(filteredProducts.map((item) => item.type))];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      // Call the mutation
      const response = await uploadProduct(data);

      // Handle success
      console.log(response);
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"back"} pageName={"Product"} />
      <form
        onSubmit={handleSubmit}
        className="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <TextField
          required
          fullWidth
          id="name"
          label="Product Name"
          name="name"
          autoComplete="off"
          autoFocus
        />
        <TextField
          required
          fullWidth
          id="description"
          label="Product Description"
          name="description"
          autoComplete="off"
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            displayEmpty
            name="category"
            labelId="category-label"
            input={<OutlinedInput />}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoriesData.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          fullWidth
          id="type"
          label="Product Type"
          name="type"
          autoComplete="off"
        />
        <div>
          Other types:{" "}
          {types.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => copyToClipboard(item)}
              style={{
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                marginLeft: "15px",
              }}
            >
              {item}
            </button>
          ))}
          {copied ? (
            <span style={{ marginLeft: "10px" }}>{"(: "}Copied!</span>
          ) : null}
        </div>
        <TextField
          required
          fullWidth
          id="price"
          label="Product Price"
          name="price"
          type="number"
          autoComplete="off"
        />
        <TextField
          required
          fullWidth
          id="discount"
          label="Product Discount"
          name="discount"
          type="number"
          autoComplete="off"
        />
        <TextField
          required
          fullWidth
          type="number"
          id="countInStock"
          label="Product Stock"
          name="countInStock"
          autoComplete="off"
        />
        <label>
          <input
            name="image"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          {img ? img.name : <span>Product Image</span>}
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
