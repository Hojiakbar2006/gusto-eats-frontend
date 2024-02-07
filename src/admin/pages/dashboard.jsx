import React from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table/table";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOrder } from "../../app/slice/orderItemSlice";
import { useGetOrdersQuery } from "../../app/api/endpoints/order";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../app/api/endpoints/product";
import {
  useGetUsersQuery,
  useGetUsersStaffQuery,
} from "../../app/api/endpoints/forAdmin";
import { FormatDate } from "../../utils/formatDate";
import { SkeletonComp } from "../components";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: orders, isLoading: orderLoad } = useGetOrdersQuery();
  const { data: products, isLoading: productLoad } = useGetProductsQuery();
  const { data: categories, isLoading: categoryLoad } = useGetCategoriesQuery();
  const { data: users, isLoading: userLoad } = useGetUsersQuery();
  const { data: usersStaff, isLoading: userStaffLoad } =
    useGetUsersStaffQuery();

  const card = [
    {
      id: 1,
      name: "Products",
      count: products?.products.length || 0,
      link: "/product",
    },
    {
      id: 2,
      name: "Categories",
      count: categories?.length || 0,
      link: "/category",
    },
    {
      id: 3,
      name: "Users",
      count: users?.length || 0,
      link: "/category",
    },
    {
      id: 4,
      name: "Staff",
      count: usersStaff?.length || 0,
      link: "/staff-users",
    },
  ];

  let load = orderLoad || productLoad || categoryLoad || userLoad || userStaffLoad;

  return (
    <div className="dashboard-container comp-container">
      <div className="route comp-container">
        <h2>Dashboard</h2>
      </div>
      <div className="card-container">
        {card.map(({ id, name, count, link }) => {
          return load ? (
            <div className="comp-container card" key={id}>
              <h1>
                <Skeleton width="100%" height="100%"></Skeleton>
              </h1>
              <h2>
                <Skeleton width="100%" height="100%"></Skeleton>
              </h2>
            </div>
          ) : (
            <div className="comp-container card" key={id}>
              <h1>
                <Link to={link}>{name}</Link>
              </h1>
              <h2>{count}</h2>
            </div>
          );
        })}
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item) => {
            const date = FormatDate(new Date(item.createdAt));
            return (
              <tr key={item.id}>
                <td
                  onClick={() => {
                    dispatch(setOrder({ open: true, order: item }));
                  }}
                >
                  {item.name}
                </td>
                <td>{item.phone_number}</td>
                <td>{item.shippingAddress.address}</td>
                <td>{date}</td>
                <td>{item.totalPrice}</td>
              </tr>
            );
          }) ?? <SkeletonComp sk_count={9} tab_col={5} />}
        </tbody>
      </Table>
    </div>
  );
}
