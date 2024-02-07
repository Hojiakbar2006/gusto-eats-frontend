import React from "react";
import { useNavigate } from "react-router-dom";

export default function RouteNav({ route, pageName }) {
  const navigate = useNavigate();

  return (
    <div className="route comp-container">
      <h2>{pageName}</h2>
      <button
        onClick={() => (route === "back" ? navigate(-1) : navigate(route))}
      >
        {route} {pageName}
      </button>
    </div>
  );
}
