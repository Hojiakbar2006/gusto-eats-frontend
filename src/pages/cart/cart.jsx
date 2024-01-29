import React, { useEffect } from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Remove, DeleteForeverOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  getCartItems,
  addQty,
  removeQty,
  removeFromCart,
} from "../../redux/slice/cartSlice";
import { useCreateOrderMutation } from "../../redux/services/orderApi";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { FormatPrice } from "../../utils/formatPrice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();
  const [sendOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    phone_number: Yup.string()
      .required("Required")
      .min(9, "Phone number should be at least 9 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      address: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { name, phone_number, address } = values;
      if (!localStorage.getItem("access_token")) {
        navigate("/login/");
      }

      try {
        const res = await sendOrder({
          name,
          phone_number,
          shippingAddress: { address },
          totalPrice: cart.total,
          orderItems: cart.cartItems.map(({ id, name, quantity }) => ({
            product: id,
            name,
            qty: quantity,
          })),
        });

        const { error, data } = res;
        console.log(res);

        if (data) {
          enqueueSnackbar("Buyurtmangiz jo'natildi", {
            variant: "success",
          });
          localStorage.removeItem("cartItems");
          localStorage.removeItem("cartState");
        }

        if (error) {
          if (error.status === 400) {
            enqueueSnackbar("Ma'lumotlari to'liq emas", {
              variant: "error",
            });
          }
          if (error.status === 401) {
            enqueueSnackbar("Ma'lumotlari topilmadi", {
              variant: "error",
            });
          }
        }
      } catch (error) {
        console.error("Order submission error:", error);
      }
    },
  });

  return (
    <div className="cart-container">
      <div className="comp-container">
        {cart.cartItems.length !== 0 ? (
          <>
            {cart.cartItems.map((item) => {
              const img =
                item.image && !item.image.startsWith("http")
                  ? `${process.env.REACT_APP_BASE_URL}${item.image}`
                  : item.image;
              return (
                <div className="cart-box" key={item.id}>
                  <div>
                    <figure>
                      <img width="100%" src={img} alt={item.name} />
                    </figure>
                    <h3>{item.name}</h3>
                  </div>
                  <div>
                    <IconButton onClick={() => dispatch(addQty(item))}>
                      <AddIcon />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton onClick={() => dispatch(removeQty(item))}>
                      <Remove />
                    </IconButton>
                  </div>
                  <IconButton onClick={() => dispatch(removeFromCart(item))}>
                    <DeleteForeverOutlined sx={{ color: red[500] }} />
                  </IconButton>
                </div>
              );
            })}
          </>
        ) : (
          <div className="message">
            <h1>No Items</h1>
          </div>
        )}
      </div>
      <div className="comp-container">
        <h2>
          Sub total:
          {FormatPrice(cart.total)}
        </h2>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone number"
            type="number"
            id="phone_number"
            autoComplete="off"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            error={
              formik.touched.phone_number && Boolean(formik.errors.phone_number)
            }
            helperText={
              formik.touched.phone_number && formik.errors.phone_number
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            autoComplete="off"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <LoadingButton
            fullWidth
            sx={{
              height: "50px",
              fontSize: "18px",
              bgcolor: "#0b5dd6",
              marginBottom: 2,
              marginTop: 2,
            }}
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingIndicator="Loading…"
          >
            Place order
          </LoadingButton>
        </Box>
      </div>
    </div>
  );
};

export default Cart;
