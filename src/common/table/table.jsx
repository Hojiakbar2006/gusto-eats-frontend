import React from "react";
import "./table.css";

const Table = ({ children }) => {
  return (
    <div className="table-card comp-container">
      <table className="custom-table">{children}</table>;
    </div>
  );
};

export default Table;
