import React from "react";
import "./banner.css";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
                  navigate(`/menu/?search=${e.target.search.value}`);
                } else {
                  navigate(`/menu/`);
                }
              }}
            >
              <OutlinedInput
                id="search"
                name="search"
                fullWidth
                autoComplete="off"
                sx={{
                  background: "#fff",
                  borderRadius: "5px",
                  height: "40px",
                  fontSize: "18px",
                }}
                startAdornment={
                  <InputAdornment position="start">search:</InputAdornment>
                }
              />
              <Button
                type="submit"
                sx={{ height: "40px", width: "180px", bgcolor: "#0b5dd6" }}
                startIcon={<Search />}
                disableElevation
                variant="contained"
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
