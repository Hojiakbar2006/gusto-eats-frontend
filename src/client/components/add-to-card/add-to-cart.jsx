import { Drawer, Button, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { FormatPrice } from "../../../utils/formatPrice";
import { DeleteOutlined } from "@ant-design/icons";
import { closeCart } from "../../../app/slice/toggleCartSlice";
import { getCartItems, removeFromCart } from "../../../app/slice/cartSlice";

const AddToCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isOpen = useSelector((state) => state.menu.isOpen);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <Drawer
      placement="right"
      visible={isOpen}
      onClose={() => dispatch(closeCart())}
    >
      <div>
        {cart.cartItems.map((item) => {
          const name = item.name.split(" ").slice(0, 4).join(" ");
          const img =
            item.image && !item.image.startsWith("http")
              ? `${process.env.REACT_APP_BASE_URL}${item.image}`
              : item.image;
          return (
            <>
              <div
                className="comp-container"
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                  padding: 10,
                }}
              >
                <Image
                  src={img}
                  alt={item.name}
                  style={{ marginRight: 10, width: 50, height: 50 }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{name}</h4>
                  <p>Count: {item.quantity}</p>
                  <p>Total Price: {FormatPrice(item.quantity * item.price)}</p>
                </div>
                <Button
                  onClick={() => dispatch(removeFromCart(item))}
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                />
              </div>
            </>
          );
        })}
        <div>
          <br />

          <h3>Sub Total: {FormatPrice(cart.total)} </h3>
          <br />

          <div>
            <Button
              type="primary"
              style={{ height: "40px" }}
              component={Link}
              onClick={() => dispatch(closeCart())}
            >
              <NavLink to="/cart/">Place order</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddToCart;
