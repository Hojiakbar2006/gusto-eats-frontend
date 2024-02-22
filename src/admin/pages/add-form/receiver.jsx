import React from "react";
import { Button, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { RouteNav } from "../../components";

export default function ReceiverAdd() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);


  };
  return (
    <div className="dashboard-container comp-container">
      <RouteNav pageName="Receiver" route="add" />
      <form
        onSubmit={handleSubmit}
        className="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Input
          required
          name="chat_id"
          placeholder="Chat id"
          autoFocus
          size="large"
        />
        <Button
          size="large"
          type="primary"
          htmlType="submit"
        //   loading={isLoading}
        //   icon={isLoading && <LoadingOutlined />}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
