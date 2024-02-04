import React from "react";
import "./category.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/services/productApi";

const Category = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoriesQuery();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  if (!isLoading) {
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
                {data.map((item) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Category;
