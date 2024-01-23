import React from "react";
import "./category.css";
import { LinearProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/services/productApi";

export default function Category() {
  // const url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  if (isLoading) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="cat-container">
      <div className="container">
        <div className="comp-container">
          <div className="category">
            <div>
              <button
                className={category === null ? "cat-btn active" : "cat-btn"}
                onClick={() => navigate("")}
              >
                All
              </button>
              {categories.map((item) => {
                return (
                  <button
                    className={
                      item.name === category ? "cat-btn active" : "cat-btn"
                    }
                    key={item.id}
                    onClick={() => navigate(`?category=${item.name}`)}
                  >
                    <img width="30px" src={item.image} alt="" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
