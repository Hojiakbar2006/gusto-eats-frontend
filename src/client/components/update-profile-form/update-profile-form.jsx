import React, { useState } from "react";
import { Form, Input, Button, message as antdMessage } from "antd";
import { Link } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../app/api/endpoints/auth";

export default function UpdateProfileForm() {
  const [updateDate, { isLoading: updateLoad }] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery();
  const [value, setValue] = useState(data);

  const handleSubmit = async (e) => {
    try {
      const updatedFields = {};

      if (data.first_name !== value.first_name) {
        updatedFields.first_name = value.first_name;
      }
      if (data.last_name !== value.last_name) {
        updatedFields.last_name = value.last_name;
      }
      if (data.email !== value.email) {
        updatedFields.email = value.email;
      }
      if (data.phone_number !== value.phone_number) {
        updatedFields.phone_number = value.phone_number;
      }

      if (Object.keys(updatedFields).length > 0) {
        const res = await updateDate(updatedFields);
        const { error, data } = res;
        if (data) {
          antdMessage.success("Ma'lumotlar o'zgartirildi");
        }
        if (error) {
          antdMessage.error("Ma'lumotlarni o'zgartirishda xatolik");
        }
      } else {
        antdMessage.info("O'zgartirilgan ma'lumotlar topilmadi");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      antdMessage.error("Amaliyotni bajarishda xatolik");
    }
  };

  return (
    <div className="comp-container" style={{ padding: "25px" }}>
      <h1>{data?.first_name}</h1>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        style={{
          marginTop: 10,
          width: "100%",
        }}
        initialValues={data}
      >
        <Input
          size="large"
          placeholder="First Name"
          value={value?.first_name}
          onChange={(e) => setValue({ ...value, first_name: e.target.value })}
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="Last Name"
          value={value?.last_name}
          onChange={(e) => setValue({ ...value, last_name: e.target.value })}
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="Email Address"
          value={value?.email}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="Phone Number"
          type="number"
          value={value?.phone_number}
          onChange={(e) => setValue({ ...value, phone_number: e.target.value })}
        />
        <br />
        <br />
        <Link>Change Password</Link>
        <br />
        <br />
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
          loading={updateLoad}
        >
          Update
        </Button>
        <br />
        <br />
        <Link to="/login/">Already have an account? Sign in</Link>
      </Form>
    </div>
  );
}
