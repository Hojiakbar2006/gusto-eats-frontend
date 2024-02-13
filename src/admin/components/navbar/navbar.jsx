import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeAdminStatus, removeTokens } from "../../../app/slice/authSlice";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.auth.accessToken);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuItemClick = (destination) => {
    navigate(destination);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(removeTokens());
    dispatch(removeAdminStatus());
    navigate("/");

    setAnchorEl(null);
  };
  return (
    <nav>
      <Link to="/">
        <img width="200px" src={logo} alt="Logo" />
      </Link>
      <div className="list_items">
        {access_token ? (
          <Box>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              aria-label="User Menu"
              onClick={handleMenuClick}
            >
              <Avatar />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem onClick={() => handleMenuItemClick("/profile/")}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            sx={{ height: "40px", bgcolor: "#0b5dd6" }}
            startIcon={<Person />}
            disableElevation
            variant="contained"
            onClick={() => navigate("/login/")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
