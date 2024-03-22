import React from "react";
import "./category.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/api/endpoints/product";
import { Button, Skeleton } from "antd";

const Category = () => {
  const navigate = useNavigate();
  const { data } = useGetCategoriesQuery();
  const category = new URLSearchParams(useLocation().search).get("category");

  return (
    <div className="cat-container">
      <div className="container">
        <div className="comp-container">
          <div className="category">
            <div>
              <Button
                className={category === null ? "cat-btn active" : "cat-btn"}
                onClick={() => navigate("")}
              >
                All
              </Button>
              {data?.map((item) => (
                <Button
                  className={
                    item.name === category ? "cat-btn active" : "cat-btn"
                  }
                  key={item.id}
                  onClick={() => navigate(`?category=${item.name}`)}
                  icon={<img width="30px" src={item.image} alt="" />}
                >
                  {item.name}
                </Button>
              )) ?? <Skeleton.Button style={{ width: "1000px", height: 40 }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
