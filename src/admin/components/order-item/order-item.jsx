import React, { useCallback, useMemo } from "react";
import "./order-item.css";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../../app/slice/orderItemSlice";

export default function OrderItem() {
  const dispatch = useDispatch();
  const { open, order } = useSelector((state) => state.orderItem);

  const handleCloseModal = useCallback(() => {
    dispatch(setOrder({ open: false, order }));
  }, [dispatch, order]);

  const orderItems = useMemo(() => {
    return order.orderItems?.map((item) => {
      return (
        <div className="box" key={item.id}>
          <figure>
            <img
              src={`${process.env.REACT_APP_BASE_URL}${item.product.image}`}
              alt="item"
            />
          </figure>
          <h2>{item.product.name}</h2>
          <h2>{item.qty}</h2>
          <h2>{item.qty * item.price}</h2>
        </div>
      );
    });
  }, [order]);

  return (
    <>
      <div
        className={open ? "modal-wrapper open" : "modal-wrapper"}
        onClick={handleCloseModal}
      ></div>
      <div
        className={open ? "modal comp-container open" : "modal comp-container"}
      >
        <div className="order-card">
          <div className="order-items">{orderItems}</div>
          <div className="info"></div>
        </div>
      </div>
    </>
  );
}
