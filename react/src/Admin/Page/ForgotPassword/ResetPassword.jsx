import { Form, Input, Button, Typography, Card, Space, Flex, message } from "antd";
import { useDispatch } from "react-redux";
import { ResetPasswordActionAsync, OtpEmailActionAsync } from "../../../Redux/ReducerAPI/AuthenticationReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


const { Title } = Typography;

const ResetPassword = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    const [countdown, setCountdown] = useState(60);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const [otpValues, setOtpValues] = useState('');

    const onChange = (text) => {
        console.log('onChange:', text);
        setOtpValues(text);
    };

    const onFinish = (values) => {

        values = {
            ...values,
            otp: otpValues
        }
        console.log(values);
        dispatch(ResetPasswordActionAsync(username, values))
            .then((response) => {
                if (response)
                    navigate("/");
            })
            .catch((error) => {
                console.error("Failed to reset password:", error);
                // Handle errors or show error messages
            });
    };

    const handleResendOTP = () => {
        if (isCountdownActive) return;
        console.log(username);
        dispatch(OtpEmailActionAsync({ username }))
            .then((response) => {
                if (response) {
                    startCountdown();
                }
            })
            .catch((error) => {
                console.error(error);
                message.error("Đã xảy ra lỗi khi gửi OTP, vui lòng thử lại.");
            });
    };

    const startCountdown = () => {
        setIsCountdownActive(true);
        setCountdown(60);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsCountdownActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
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
                        Đổi mật khẩu
                    </Title>
                }
            >
                <Form
                    form={form}
                    name="changePassword"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="newPassword"
                        label="Mật khẩu mới"
                        style={{ marginBottom: "16px" }}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới.",
                            },
                            {
                                min: 6,
                                message: "Mật khẩu phải dài ít nhất 6 ký tự."
                            },
                            {
                                pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                                message: "Mật khẩu của bạn phải chứa ít nhất một chữ cái và một chữ số."
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="Nhập mật khẩu mới của bạn"
                            style={{ borderRadius: "4px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu mới"
                        validateTrigger="onBlur"
                        style={{ marginBottom: "16px" }}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng xác nhân mật khẩu mới",
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || value === form.getFieldValue('newPassword')) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu xác nhận của bạn không trùng khớp."));
                                }
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="Nhập mật khẩu để xác nhận"
                            style={{ borderRadius: "4px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="otp"
                        label="OTP"
                        style={{ marginBottom: "16px" }}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mã OTP",
                            },
                        ]}
                    >
                        <Flex gap="middle" align="flex-start" vertical>
                            <Input.OTP length={6} onChange={onChange} />
                        </Flex>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ borderRadius: "4px", fontWeight: "bold" }}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Space style={{ width: "100%", justifyContent: "space-between" }}>
                            <Button
                                type="link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/");
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="link"
                                onClick={handleResendOTP}
                                disabled={isCountdownActive}
                            >
                                Gửi lại mã OTP {isCountdownActive ? `(${countdown}s)` : ''}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    );
};

export default ResetPassword;
