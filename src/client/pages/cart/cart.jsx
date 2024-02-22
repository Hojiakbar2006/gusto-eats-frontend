import React, { useEffect, useCallback, memo } from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { FormatPrice } from "../../../utils/formatPrice";
import { useCreateOrderMutation } from "../../../app/api/endpoints/order";
import {
  getCartItems,
  addQty,
  removeQty,
  removeFromCart,
} from "../../../app/slice/cartSlice";
import { DeleteFilled } from "@ant-design/icons";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [form] = Form.useForm();
  const [sendOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleAddQty = useCallback(
    (item) => {
      dispatch(addQty(item));
    },
    [dispatch]
  );

  const handleRemoveQty = useCallback(
    (item) => {
      dispatch(removeQty(item));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (item) => {
      dispatch(removeFromCart(item));
    },
    [dispatch]
  );

  const handleSubmit = async (values) => {
    const { name, phone_number, address } = values;

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

      if (res.data) {
        message.success("Buyurtmangiz jo'natildi");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartState");
      }

      if (res.error) {
        if (res.error.status === 400) {
          message.error("Ma'lumotlari to'liq emas");
        }
        if (res.error.status === 401) {
          message.error("Ma'lumotlari topilmadi");
        }
      }
    } catch (error) {
      console.error("Order submission error:", error);
    }
  };

  return (
    <div className="cart">
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
                      <Button onClick={() => handleAddQty(item)}>+</Button>
                      <span> {item.quantity} </span>
                      <Button onClick={() => handleRemoveQty(item)}>-</Button>
                    </div>
                    <Button onClick={() => handleRemoveFromCart(item)}>
                      <DeleteFilled style={{ color: "red" }} />
                    </Button>
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
          <h3>
            {cart.cartItems.length === 0
              ? "No Items"
              : cart.cartItems.length > 1
              ? `${cart.cartItems.length} Items in your cart`
              : `${cart.cartItems.length} Item in your cart`}
          </h3>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" size="large" />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  min: 9,
                  message: "Phone number should be at least 9 characters",
                },
              ]}
            >
              <Input placeholder="Phone number" type="number" size="large" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input.TextArea placeholder="Address" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
              >
                Place order
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);
