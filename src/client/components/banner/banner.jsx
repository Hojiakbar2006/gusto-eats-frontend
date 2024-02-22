import React from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./banner.css";

export default function Banner() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="comp-container">
        <div className="banner">
          <div>
            <h1>Order food online now</h1>
            <p>Discover the best food and drinks in your area, anytime</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (e.target.search.value) {
                  navigate(`?query=${e.target.search.value}`);
                } else {
                  navigate(`/menu/`);
                }
              }}
            >
              <Input
                id="search"
                name="search"
                placeholder="search"
                style={{
                  background: "#fff",
                  borderRadius: "5px",
                  height: "40px",
                  fontSize: "18px",
                }}
                prefix={<SearchOutlined />}
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  height: "40px",
                  width: "180px",
                  backgroundColor: "#0b5dd6",
                }}
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
