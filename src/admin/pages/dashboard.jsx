import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/table";
import { useGetOrdersQuery } from "../../redux/services/orderApi";
import { LinearProgress } from "@mui/material";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../redux/services/productApi";
import {
  useGetUsersQuery,
  useGetUsersStaffQuery,
} from "../../redux/services/forAdminApi";

export default function Dashboard() {
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

  if (orderLoad || productLoad || categoryLoad || userLoad || userStaffLoad) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className="dashboard-container comp-container">
      <div className="route comp-container">
        <h2>Dashboard</h2>
      </div>
      <div className="card-container">
        {card.map(({ id, name, count, link }) => (
          <div className="comp-container card" key={id}>
            <h1>
              <Link to={link}>{name}</Link>
            </h1>
            <h2>{count}</h2>
          </div>
        ))}
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
            {orders.map((item) => {
              const date = new Date(item.createdAt);

              // Format the date using Intl.DateTimeFormat
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                // second: "numeric",
                // timeZoneName: "short",
              }).format(date);

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.shippingAddress.address}</td>
                  <td>{formattedDate}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
