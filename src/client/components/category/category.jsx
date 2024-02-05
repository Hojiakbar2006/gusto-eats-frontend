import React, { useEffect, useRef } from "react";
import "./category.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/api/endpoints/product";
import { Skeleton } from "@mui/material";

const Category = ({ setIsAboveViewport }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoriesQuery();
  const categoryRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const handleScroll = () => {
    if (categoryRef.current) {
      const elementTop = categoryRef.current.getBoundingClientRect().bottom;
      setIsAboveViewport(elementTop < 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <div className="comp-container">
          <div className="category">
            <Skeleton width="100%" height={50} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cat-container" ref={categoryRef}>
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
};

export default Category;