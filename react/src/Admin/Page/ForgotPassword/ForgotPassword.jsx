import { Form, Input, Button, Typography, Card, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { OtpEmailActionAsync } from "../../../Redux/ReducerAPI/AuthenticationReducer";
import { NavLink, useNavigate } from "react-router-dom";


const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(OtpEmailActionAsync(values))
      .then((response) => {
        if (response)
          navigate(`/forgot-password/reset-password?username=${(values.username)}`);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors or show error messages
      });
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
            Tìm tài khoản của bạn
          </Title>
        }
      >
        <Form
          form={form}
          name="forgot_password"
          onFinish={onFinish}
          layout="vertical"
          validateTrigger="onBlur"
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            style={{ marginBottom: "16px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập của bạn.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nhập tên đăng nhập của bạn"
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
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <NavLink to="/">
                Hủy
              </NavLink>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
