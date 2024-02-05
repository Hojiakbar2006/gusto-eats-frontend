import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/table";
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
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);

  let load =
    orderLoad || productLoad || categoryLoad || userLoad || userStaffLoad;

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
      <div className="table-card comp-container">
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
              const date = new Date(item.createdAt);

              // Format the date using Intl.DateTimeFormat
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }).format(date);

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
                  <td>{formattedDate}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              );
            }) ??
              skeletonArray.map((item) => (
                <tr key={item}>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
