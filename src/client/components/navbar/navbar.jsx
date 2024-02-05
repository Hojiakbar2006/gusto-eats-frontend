import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Person, ShoppingCart } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../app/slice/cartSlice";
import { openCart } from "../../../app/slice/toggleCartSlice";
import logo from "../../../assets/icons/logo.png";
import { removeAdminStatus, removeTokens } from "../../../app/slice/authSlice";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const access_token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

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
      <div className="list-items">
        {/* <Chip
          sx={{ borderRadius: "5px", height: "40px" }}
          icon={<LocationOn />}
          label="Your location"
        /> */}
        <NavLink to="/menu/">Menu</NavLink>
        <IconButton onClick={() => dispatch(openCart())}>
          <Badge color="primary" badgeContent={cart.cartItems.length}>
            <ShoppingCart />
          </Badge>
        </IconButton>
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
              <MenuItem onClick={() => handleMenuItemClick("/my-orders/")}>
                My orders
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
};

export default Navbar;
