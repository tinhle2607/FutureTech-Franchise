import React from "react";
import { Form, Input, Button, Typography, Card, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { OtpEmailActionAsync } from "../../../Redux/ReducerAPI/AuthenticationReducer";

const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
    const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(OtpEmailActionAsync(values))
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
        title={
          <Title level={3} style={{ textAlign: "center" }}>
            Forgot Password
          </Title>
        }
      >
        <Form
          form={form}
          name="forgot_password"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            style={{ marginBottom: "16px" }}
            rules={[
              {
                required: true,
                message: "Please input your username or email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter your username or email"
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ borderRadius: "4px", fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button type="link" href="/login">
                Back to Login
              </Button>
              <Button type="link" href="/register">
                Create an Account
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
