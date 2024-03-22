import React, { useState } from "react";
import { Form, Input, Button, message as antdMessage } from "antd";
import { Link } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../app/api/endpoints/auth";

export default function UpdateProfileForm() {
  const { data } = useGetProfileQuery();
  const [updateData, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const [formValues, setFormValues] = useState({
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    email: data?.email || "",
    phone_number: data?.phone_number || "",
  });

  const handleSubmit = async () => {
    try {
      const updatedFields = {};

      Object.keys(formValues).forEach((key) => {
        if (data[key] !== formValues[key]) {
          updatedFields[key] = formValues[key];
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        const res = await updateData(updatedFields);
        const { error, data } = res;
        if (data) {
          antdMessage.success("Profile updated successfully");
        }
        if (error) {
          antdMessage.error("Failed to update profile");
        }
      } else {
        antdMessage.info("No changes were made");
      }
    } catch (error) {
      console.error("Error:", error);
      antdMessage.error("An error occurred while processing the request");
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
        initialValues={formValues}
        onValuesChange={(changedValues, allValues) => {
          setFormValues(allValues);
        }}
      >
        <Input
          size="large"
          placeholder="First Name"
          value={formValues.first_name}
          onChange={(e) =>
            setFormValues({ ...formValues, first_name: e.target.value })
          }
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="Last Name"
          value={formValues.last_name}
          onChange={(e) =>
            setFormValues({ ...formValues, last_name: e.target.value })
          }
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="Email Address"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="Phone Number"
          type="number"
          value={formValues.phone_number}
          onChange={(e) =>
            setFormValues({ ...formValues, phone_number: e.target.value })
          }
        />
        <br />
        <br />
        <Link to="/change-password">Change Password</Link>
        <br />
        <br />
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
          loading={updateLoading}
        >
          Update
        </Button>
        <br />
        <br />
        <Link to="/login">Already have an account? Sign in</Link>
      </Form>
    </div>
  );
}
