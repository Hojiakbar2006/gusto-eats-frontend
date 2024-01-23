import { DeleteForeverOutlined } from "@mui/icons-material";
import { Button, Drawer, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeCart } from "../../redux/slice/toggleCartSlice";
import { useEffect } from "react";
import { getCartItems, removeFromCart } from "../../redux/slice/cartSlice";

const AddToCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isOpen = useSelector((state) => state.menu.isOpen);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => dispatch(closeCart())}>
      <div className="cart-dr">
        {cart.cartItems.map((item) => {
          const img =
            item.image && !item.image.startsWith("http")
              ? `${process.env.REACT_APP_BASE_URL}${item.image}`
              : item.image;
          return (
            <div className="box" key={item.id}>
              <figure>
                <img src={img} alt={item.name} />
              </figure>
              <div>
                <h4>{item.name}</h4>
                {`${item.quantity}x${item.price}`}
              </div>
              <IconButton onClick={() => dispatch(removeFromCart(item))}>
                <DeleteForeverOutlined sx={{ color: red[500] }} />
              </IconButton>
            </div>
          );
        })}
        <div className="cart-btn-group">
          <h3>Sub Total: {cart.total}</h3>
          <div>
            <Button
              variant="contained"
              sx={{ height: "40px", color: "#fff", bgcolor: "#0b5dd6" }}
              component={Link}
              to="/cart/"
              onClick={() => dispatch(closeCart())}
            >
              View Cart
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddToCart;
