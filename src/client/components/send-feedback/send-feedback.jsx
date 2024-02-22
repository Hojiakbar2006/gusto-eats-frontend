import React from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import axios from "axios";
import "./send-feedback.css";

export default function SendFeedBack() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/feedback/`,
        values
      );
      if (res.status === 201) {
        message.success("Feedback has been sent");
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="comp-container">
        <div className="feedback">
          <div className="title">
            <h1>Send feedback</h1>
            <p>You can write down everything to develop foods</p>
            <br />
          </div>
          <div className="feedback-box">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{ width: "100%", margin: "0 auto" }}
            >
              <Row gutter={13}>
                <Col span={12}>
                  <Form.Item
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input size="large" placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea rows={4} size="large" placeholder="Message" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  Send Feedback
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
